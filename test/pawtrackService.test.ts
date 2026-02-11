import { describe, expect, it } from 'vitest';
import {
  InMemoryReminderPolicyRepository,
  InMemoryVaccineRepository,
} from '../src/application/inMemoryRepositories';
import { PawTrackService } from '../src/application/pawtrackService';
import { VaccineRecord } from '../src/domain/types';

describe('PawTrackService', () => {
  it('creates default reminder policy on first save', async () => {
    const vaccineRepository = new InMemoryVaccineRepository();
    const policyRepository = new InMemoryReminderPolicyRepository();
    const service = new PawTrackService(vaccineRepository, policyRepository);

    const record: VaccineRecord = {
      id: 'rec-11',
      petId: 'pet-1',
      vaccineName: 'Rabies',
      dueDate: '2026-10-01',
      createdBy: 'owner',
    };

    await service.upsertVaccineRecord(record);

    const policy = await policyRepository.get('rec-11');
    expect(policy?.offsetsInDays).toEqual([7, 1]);
  });

  it('returns reminders sorted by nearest reminder date', async () => {
    const vaccineRepository = new InMemoryVaccineRepository();
    const policyRepository = new InMemoryReminderPolicyRepository();
    const service = new PawTrackService(vaccineRepository, policyRepository);

    await service.upsertVaccineRecord({
      id: 'late',
      petId: 'pet-1',
      vaccineName: 'A',
      dueDate: '2026-10-12',
      createdBy: 'vet',
    });

    await service.upsertVaccineRecord({
      id: 'early',
      petId: 'pet-1',
      vaccineName: 'B',
      dueDate: '2026-10-05',
      createdBy: 'vet',
    });

    const result = await service.listUpcomingReminders();
    expect(result[0].record.id).toBe('early');
    expect(result[1].record.id).toBe('late');
  });
});

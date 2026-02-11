import { describe, expect, it } from 'vitest';
import {
  buildReminderSchedule,
  getDefaultReminderPolicy,
  getSyncEventTitle,
} from '../src/domain/reminderScheduler';
import { VaccineRecord } from '../src/domain/types';

describe('reminderScheduler', () => {
  const record: VaccineRecord = {
    id: 'rec-1',
    petId: 'pet-1',
    vaccineName: 'Rabies',
    dueDate: '2026-04-10',
    createdBy: 'vet',
  };

  it('creates default 7-day and 1-day reminders', () => {
    const reminders = buildReminderSchedule(record, getDefaultReminderPolicy(record.id));

    expect(reminders).toEqual([
      { recordId: 'rec-1', reminderDate: '2026-04-03', offsetInDays: 7 },
      { recordId: 'rec-1', reminderDate: '2026-04-09', offsetInDays: 1 },
    ]);
  });

  it('deduplicates and sorts offsets while ignoring invalid values', () => {
    const reminders = buildReminderSchedule(record, {
      recordId: record.id,
      offsetsInDays: [1, 7, 1, 0, -3],
      enabled: true,
    });

    expect(reminders.map((item) => item.offsetInDays)).toEqual([7, 1]);
  });

  it('returns no reminders when policy is disabled', () => {
    const reminders = buildReminderSchedule(record, {
      recordId: record.id,
      offsetsInDays: [7, 1],
      enabled: false,
    });

    expect(reminders).toEqual([]);
  });

  it('builds stable calendar event title', () => {
    expect(getSyncEventTitle('Luna', 'Rabies')).toBe('Luna · Rabies vaccine due');
  });
});

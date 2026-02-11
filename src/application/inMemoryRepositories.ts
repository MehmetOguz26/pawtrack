import { ReminderPolicy, VaccineRecord } from '../domain/types';
import { ReminderPolicyRepository, VaccineRepository } from './pawtrackService';

export class InMemoryVaccineRepository implements VaccineRepository {
  constructor(private records: VaccineRecord[] = []) {}

  async list(): Promise<VaccineRecord[]> {
    return [...this.records];
  }

  async save(record: VaccineRecord): Promise<void> {
    const index = this.records.findIndex((item) => item.id === record.id);
    if (index >= 0) {
      this.records[index] = record;
      return;
    }

    this.records.push(record);
  }
}

export class InMemoryReminderPolicyRepository implements ReminderPolicyRepository {
  private readonly store = new Map<string, ReminderPolicy>();

  async get(recordId: string): Promise<ReminderPolicy | null> {
    return this.store.get(recordId) ?? null;
  }

  async save(policy: ReminderPolicy): Promise<void> {
    this.store.set(policy.recordId, policy);
  }
}

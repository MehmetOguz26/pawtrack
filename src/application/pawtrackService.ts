import { buildReminderSchedule, getDefaultReminderPolicy } from '../domain/reminderScheduler';
import { ReminderPolicy, ScheduledReminder, VaccineRecord } from '../domain/types';

export interface VaccineRepository {
  list(): Promise<VaccineRecord[]>;
  save(record: VaccineRecord): Promise<void>;
}

export interface ReminderPolicyRepository {
  get(recordId: string): Promise<ReminderPolicy | null>;
  save(policy: ReminderPolicy): Promise<void>;
}

export interface UpcomingReminderView {
  record: VaccineRecord;
  reminders: ScheduledReminder[];
}

export class PawTrackService {
  constructor(
    private readonly vaccineRepository: VaccineRepository,
    private readonly policyRepository: ReminderPolicyRepository,
  ) {}

  async upsertVaccineRecord(record: VaccineRecord): Promise<void> {
    await this.vaccineRepository.save(record);

    const existingPolicy = await this.policyRepository.get(record.id);
    if (!existingPolicy) {
      await this.policyRepository.save(getDefaultReminderPolicy(record.id));
    }
  }

  async listUpcomingReminders(): Promise<UpcomingReminderView[]> {
    const records = await this.vaccineRepository.list();

    const views: UpcomingReminderView[] = [];
    for (const record of records) {
      const policy = (await this.policyRepository.get(record.id)) ?? getDefaultReminderPolicy(record.id);
      const reminders = buildReminderSchedule(record, policy);
      views.push({ record, reminders });
    }

    return views.sort((left, right) => {
      const leftDate = left.reminders[0]?.reminderDate ?? left.record.dueDate;
      const rightDate = right.reminders[0]?.reminderDate ?? right.record.dueDate;
      return leftDate.localeCompare(rightDate);
    });
  }
}

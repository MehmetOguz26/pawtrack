import { ReminderPolicy, ScheduledReminder, VaccineRecord } from './types';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const toDate = (isoDate: string): Date => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const toIsoDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getDefaultReminderPolicy = (recordId: string): ReminderPolicy => ({
  recordId,
  offsetsInDays: [7, 1],
  enabled: true,
});

export const buildReminderSchedule = (
  record: VaccineRecord,
  policy: ReminderPolicy,
): ScheduledReminder[] => {
  if (!policy.enabled) {
    return [];
  }

  const due = toDate(record.dueDate);

  return [...new Set(policy.offsetsInDays)]
    .filter((offset) => offset > 0)
    .sort((a, b) => b - a)
    .map((offsetInDays) => {
      const reminderDate = new Date(due.getTime() - offsetInDays * MS_PER_DAY);

      return {
        recordId: record.id,
        reminderDate: toIsoDate(reminderDate),
        offsetInDays,
      };
    });
};

export const getSyncEventTitle = (petName: string, vaccineName: string): string =>
  `${petName} · ${vaccineName} vaccine due`;

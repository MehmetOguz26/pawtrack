import { getSyncEventTitle } from '../domain/reminderScheduler';
import { ScheduledReminder, VaccineRecord } from '../domain/types';

export type CalendarProvider = 'google' | 'microsoft';

export interface CalendarEventDraft {
  title: string;
  description: string;
  dueDate: string;
  remindersInMinutes: number[];
}

const MINUTES_IN_DAY = 24 * 60;

export const toCalendarDraft = (
  record: VaccineRecord,
  petName: string,
  reminders: ScheduledReminder[],
): CalendarEventDraft => {
  const remindersInMinutes = reminders
    .map((item) => item.offsetInDays * MINUTES_IN_DAY)
    .sort((a, b) => b - a);

  return {
    title: getSyncEventTitle(petName, record.vaccineName),
    description: record.notes ?? '',
    dueDate: record.dueDate,
    remindersInMinutes,
  };
};

export const buildProviderPayload = (
  provider: CalendarProvider,
  draft: CalendarEventDraft,
): Record<string, unknown> => {
  if (provider === 'google') {
    return {
      summary: draft.title,
      description: draft.description,
      start: { date: draft.dueDate },
      end: { date: draft.dueDate },
      reminders: {
        useDefault: false,
        overrides: draft.remindersInMinutes.map((minutes) => ({ method: 'popup', minutes })),
      },
    };
  }

  return {
    subject: draft.title,
    body: {
      contentType: 'text',
      content: draft.description,
    },
    start: {
      dateTime: `${draft.dueDate}T09:00:00`,
      timeZone: 'UTC',
    },
    end: {
      dateTime: `${draft.dueDate}T09:30:00`,
      timeZone: 'UTC',
    },
    isReminderOn: true,
    reminderMinutesBeforeStart: draft.remindersInMinutes.at(-1) ?? MINUTES_IN_DAY,
  };
};

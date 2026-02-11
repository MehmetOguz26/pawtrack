import { describe, expect, it } from 'vitest';
import { buildProviderPayload, toCalendarDraft } from '../src/sync/calendarEventBuilder';
import { ScheduledReminder, VaccineRecord } from '../src/domain/types';

describe('calendarEventBuilder', () => {
  const record: VaccineRecord = {
    id: 'r1',
    petId: 'p1',
    vaccineName: 'Rabies',
    dueDate: '2026-04-10',
    createdBy: 'vet',
    notes: 'Annual follow-up',
  };

  const reminders: ScheduledReminder[] = [
    { recordId: 'r1', reminderDate: '2026-04-03', offsetInDays: 7 },
    { recordId: 'r1', reminderDate: '2026-04-09', offsetInDays: 1 },
  ];

  it('maps reminders into calendar draft minute offsets', () => {
    const draft = toCalendarDraft(record, 'Luna', reminders);
    expect(draft.remindersInMinutes).toEqual([10080, 1440]);
  });

  it('builds a google compatible payload', () => {
    const draft = toCalendarDraft(record, 'Luna', reminders);
    const payload = buildProviderPayload('google', draft) as {
      summary: string;
      reminders: { overrides: Array<{ minutes: number }> };
    };

    expect(payload.summary).toContain('Luna');
    expect(payload.reminders.overrides.map((item) => item.minutes)).toEqual([10080, 1440]);
  });

  it('builds a microsoft compatible payload', () => {
    const draft = toCalendarDraft(record, 'Luna', reminders);
    const payload = buildProviderPayload('microsoft', draft) as {
      subject: string;
      reminderMinutesBeforeStart: number;
    };

    expect(payload.subject).toContain('Rabies');
    expect(payload.reminderMinutesBeforeStart).toBe(1440);
  });
});

export type Species = 'cat' | 'dog';

export type EntryCreator = 'owner' | 'vet';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  birthDate?: string;
  notes?: string;
}

export interface VaccineRecord {
  id: string;
  petId: string;
  vaccineName: string;
  dueDate: string;
  appliedDate?: string;
  notes?: string;
  createdBy: EntryCreator;
}

export interface ReminderPolicy {
  recordId: string;
  offsetsInDays: number[];
  enabled: boolean;
}

export interface ScheduledReminder {
  recordId: string;
  reminderDate: string;
  offsetInDays: number;
}

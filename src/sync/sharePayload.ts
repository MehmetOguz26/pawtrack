import { VaccineRecord } from '../domain/types';

export interface SharedSchedulePayload {
  petName: string;
  species: 'cat' | 'dog';
  records: VaccineRecord[];
  exportedAt: string;
}

export const encodeSharedSchedule = (payload: SharedSchedulePayload): string => {
  return encodeURIComponent(JSON.stringify(payload));
};

export const decodeSharedSchedule = (encoded: string): SharedSchedulePayload => {
  return JSON.parse(decodeURIComponent(encoded)) as SharedSchedulePayload;
};

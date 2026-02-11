import { describe, expect, it } from 'vitest';
import { decodeSharedSchedule, encodeSharedSchedule } from '../src/sync/sharePayload';

describe('sharePayload', () => {
  it('encodes and decodes payloads for vet-owner transfer', () => {
    const encoded = encodeSharedSchedule({
      petName: 'Luna',
      species: 'cat',
      exportedAt: '2026-03-01',
      records: [
        {
          id: 'v1',
          petId: 'p1',
          vaccineName: 'Rabies',
          dueDate: '2026-04-01',
          createdBy: 'vet',
        },
      ],
    });

    const decoded = decodeSharedSchedule(encoded);
    expect(decoded.petName).toBe('Luna');
    expect(decoded.records).toHaveLength(1);
    expect(decoded.records[0].vaccineName).toBe('Rabies');
  });
});

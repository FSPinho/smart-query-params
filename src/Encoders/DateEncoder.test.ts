import { describe, expect, test } from '@jest/globals';
import { DateEncoder } from './DateEncoder';

describe('DateEncoder', () => {
  test('Encode & Decode', () => {
    const encoder = new DateEncoder();

    expect(encoder.encode(new Date('2024-01-01T00:00Z'))).toBe('2024-01-01');
    expect(encoder.encode(new Date('2024-02-02T00:00Z'))).toBe('2024-02-02');
    expect(encoder.encode(null)).toBe('');

    expect(encoder.decode('2024-01-01')).toStrictEqual(new Date('2024-01-01T00:00Z'));
    expect(encoder.decode('2024-02-02')).toStrictEqual(new Date('2024-02-02T00:00Z'));
    expect(encoder.decode('')).toStrictEqual(null);
  });
});

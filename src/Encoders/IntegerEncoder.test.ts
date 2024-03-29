import { describe, expect, test } from '@jest/globals';
import { IntegerEncoder } from './IntegerEncoder';

describe('IntegerEncoder', () => {
  test('Encode & Decode', () => {
    const encoder = new IntegerEncoder();

    expect(encoder.encode(0)).toBe('0');
    expect(encoder.encode(1)).toBe('1');
    expect(encoder.encode(2)).toBe('2');
    expect(encoder.encode(null)).toBe('');

    expect(encoder.decode('0')).toBe(0);
    expect(encoder.decode('1')).toBe(1);
    expect(encoder.decode('10')).toBe(10);
    expect(encoder.decode('')).toBe(null);
    expect(encoder.decode('X')).toBe(null);
  });
});

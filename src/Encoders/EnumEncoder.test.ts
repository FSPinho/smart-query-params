import { describe, expect, test } from '@jest/globals';
import { EnumEncoder } from './EnumEncoder';

describe('EnumEncoder', () => {
  test('Encode & Decode', () => {
    const encoder = new EnumEncoder({ a: 'A', b: 'B' });

    expect(encoder.encode('a')).toBe('A');
    expect(encoder.encode('b')).toBe('B');
    expect(encoder.encode(null)).toBe('');

    expect(encoder.decode('A')).toBe('a');
    expect(encoder.decode('B')).toBe('b');
    expect(encoder.decode('')).toBe(null);
    expect(encoder.decode('X')).toBe(null);
  });
});

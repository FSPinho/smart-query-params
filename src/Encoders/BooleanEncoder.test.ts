import { describe, expect, test } from '@jest/globals';
import { BooleanEncoder } from './BooleanEncoder';

describe('BooleanEncoder', () => {
  test('Encode & Decode', () => {
    const encoder = new BooleanEncoder();

    expect(encoder.encode(true)).toBe('t');
    expect(encoder.encode(false)).toBe('f');
    expect(encoder.encode(null)).toBe('');

    expect(encoder.decode('t')).toBe(true);
    expect(encoder.decode('f')).toBe(false);
    expect(encoder.decode('')).toBe(null);
    expect(encoder.decode('X')).toBe(null);
  });
});

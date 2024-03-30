import { describe, expect, test } from '@jest/globals';
import { EnumEncoder } from './EnumEncoder';

describe('EnumEncoder', () => {
  test.each([
    { v: 'x', e: 'X' },
    { v: 'y', e: 'Y' },
    { v: null, e: '' },
  ])('Should encode/decode "$v" to/from "$e" ', ({ v, e }) => {
    const encoder = new EnumEncoder({ x: 'X', y: 'Y' });

    expect(encoder.encode(v as 'x' | 'y' | null)).toBe(e);
    expect(encoder.decode(e)).toBe(v);
  });

  test('Should decode invalid to null', () => {
    const encoder = new EnumEncoder({ x: 'X', y: 'Y' });
    expect(encoder.decode('A')).toBe(null);
  });
});

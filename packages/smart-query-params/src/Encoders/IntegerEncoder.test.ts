import { describe, expect, test } from '@jest/globals';
import { IntegerEncoder } from './IntegerEncoder';

describe('IntegerEncoder', () => {
  test.each([
    { v: 0, e: '0' },
    { v: 1, e: '1' },
    { v: 10, e: '10' },
    { v: null, e: '' },
  ])('Should encode/decode "$v" to/from "$e" ', ({ v, e }) => {
    const encoder = new IntegerEncoder();

    expect(encoder.encode(v)).toBe(e);
    expect(encoder.decode(e)).toBe(v);
  });

  test('Should decode invalid to null', () => {
    const encoder = new IntegerEncoder();
    expect(encoder.decode('A')).toBe(null);
  });
});

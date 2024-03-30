import { describe, expect, test } from '@jest/globals';
import { BooleanEncoder } from './BooleanEncoder';

describe('BooleanEncoder', () => {
  test.each([
    { v: true, e: 't' },
    { v: false, e: 'f' },
    { v: null, e: '' },
  ])('Should encode/decode "$v" to/from "$e" ', ({ v, e }) => {
    const encoder = new BooleanEncoder();

    expect(encoder.encode(v)).toBe(e);
    expect(encoder.decode(e)).toBe(v);
  });

  test('Should decode invalid to null', () => {
    const encoder = new BooleanEncoder();
    expect(encoder.decode('A')).toBe(null);
  });
});

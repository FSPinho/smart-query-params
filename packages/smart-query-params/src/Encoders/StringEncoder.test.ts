import { describe, expect, test } from '@jest/globals';
import { StringEncoder } from './StringEncoder';

describe('StringEncoder', () => {
  test.each([
    { v: '', e: '' },
    { v: ' ', e: '%20' },
    { v: 'A~\\B', e: 'A~~%5CB' },
    { v: null, e: '-' },
  ])('Should encode/decode "$v" to/from "$e" ', ({ v, e }) => {
    const encoder = new StringEncoder();

    expect(encoder.encode(v)).toBe(e);
    expect(encoder.decode(e)).toBe(v);
  });

  test.each([{ v: 10 }, { v: false }, { v: {} }])('Should throw before encode "$v"', ({ v }) => {
    const encoder = new StringEncoder();
    expect(() => encoder.encode(v as any)).toThrow();
  });
});

import { describe, expect, test } from '@jest/globals';
import { DateEncoder } from './DateEncoder';

describe('DateEncoder', () => {
  test.each([
    { v: new Date('2024-01-01T00:00Z'), e: '2024-01-01' },
    { v: new Date('2024-02-02T00:00Z'), e: '2024-02-02' },
    { v: null, e: '' },
  ])('Should encode/decode "$v" to/from "$e" ', ({ v, e }) => {
    const encoder = new DateEncoder();

    expect(encoder.encode(v)).toBe(e);
    expect(encoder.decode(e)).toStrictEqual(v);
  });

  test.each([{ v: '' }, { v: 10 }, { v: {} }])('Should throw before encode "$v"', ({ v }) => {
    const encoder = new DateEncoder();
    expect(() => encoder.encode(v as any)).toThrow();
  });

  test('Should decode invalid to null', () => {
    const encoder = new DateEncoder();
    expect(encoder.decode('A')).toBe(null);
  });
});

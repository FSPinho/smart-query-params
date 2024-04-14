import { describe, expect, test } from '@jest/globals';
import { StringEncoder } from './StringEncoder';
import { ArrayEncoder } from './ArrayEncoder';
import { ObjectEncoder } from './ObjectEncoder';
import { IntegerEncoder } from './IntegerEncoder';

describe('ArrayEncoder', () => {
  test.each([
    { o: null, e: '-' },
    { o: [], e: '' },
    { o: ['A'], e: 'A' },
    { o: ['A', 'B'], e: 'A_B' },
    { o: ['A', 'B', 'C'], e: 'A_B_C' },
    { o: ['A', 'B', 'C D'], e: 'A_B_C%20D' },
    { o: ['A', 'B', 'C~D'], e: 'A_B_C~~~~D' },
  ])('Should encode/decode "$e"', ({ o, e }) => {
    const encoder = new ArrayEncoder(new StringEncoder());
    expect(encoder.encode(o)).toBe(e);
    expect(encoder.decode(e)).toStrictEqual(o);
  });

  test.each([
    { o: null, e: '-' },
    { o: [], e: '' },
    { o: [null], e: '~-' },
    { o: [{ a: 10 }, { a: 20 }], e: 'a.10_a.20' },
    { o: [{ a: 10 }, null], e: 'a.10_~-' },
  ])('With objects - Should encode/decode "$e"', ({ o, e }) => {
    const encoder = new ArrayEncoder(new ObjectEncoder({ a: new IntegerEncoder() }));
    expect(encoder.encode(o)).toBe(e);
    expect(encoder.decode(e)).toStrictEqual(o);
  });

  test.each([
    { o: null, e: '-' },
    { o: [], e: '' },
    { o: [null], e: '~-' },
    { o: [[null]], e: '~~~-' },
    { o: [['A']], e: 'A' },
    { o: [['A', 'B']], e: 'A~_B' },
    { o: [['A', 'B'], ['C']], e: 'A~_B_C' },
    {
      o: [
        ['A', 'B'],
        ['C', 'D'],
      ],
      e: 'A~_B_C~_D',
    },
  ])('Nested - Should encode/decode "$e"', ({ o, e }) => {
    const encoder = new ArrayEncoder(new ArrayEncoder(new StringEncoder()));
    expect(encoder.encode(o)).toBe(e);
    expect(encoder.decode(e)).toStrictEqual(o);
  });

  test.each([{ o: '' }, { o: false }, { o: 10 }, { o: {} }])('Should throw before encode "$o"', ({ o }) => {
    const encoder = new ArrayEncoder(new StringEncoder());
    expect(() => encoder.encode(o as any)).toThrow();
  });
});

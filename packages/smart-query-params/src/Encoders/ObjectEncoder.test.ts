import { describe, expect, test } from '@jest/globals';
import { BooleanEncoder } from './BooleanEncoder';
import { ObjectEncoder } from './ObjectEncoder';
import { IntegerEncoder } from './IntegerEncoder';
import { StringEncoder } from './StringEncoder';
import { EnumEncoder } from './EnumEncoder';
import { DateEncoder } from './DateEncoder';
import { ArrayEncoder } from './ArrayEncoder';

describe('ObjectEncoder', () => {
  test.each([
    { o: {}, e: '' },
    { o: { a: true }, e: 'a.t' },
    { o: { a: true, b: 10 }, e: 'a.t_b.10' },
    { o: { a: true, b: 10, c: 'A' }, e: 'a.t_b.10_c.A' },
    { o: { a: true, b: 10, c: 'A.B' }, e: 'a.t_b.10_c.A!.B' },
    { o: { a: true, b: 10, c: 'A_B' }, e: 'a.t_b.10_c.A!_B' },
    { o: { a: true, b: 10, c: 'A~B' }, e: 'a.t_b.10_c.A!!!~B' },
    { o: { a: true, b: 10, c: 'A!~B' }, e: 'a.t_b.10_c.A!!!!!!!~B' },
    { o: { a: true, b: 10, c: 'A!B' }, e: 'a.t_b.10_c.A!!!!B' },
    { o: { a: true, b: 10, c: 'A!!B' }, e: 'a.t_b.10_c.A!!!!!!!!B' },
    { o: { a: true, b: 10, c: 'A!.B' }, e: 'a.t_b.10_c.A!!!!!.B' },
    { o: { a: true, b: 10, c: 'A.B_C!D #:/%25' }, e: 'a.t_b.10_c.A!.B!_C!!!!D%20%23%3A%2F%2525' },
    { o: { d: 'x', e: new Date('2024-01-01T00:00Z') }, e: 'd.X_e.2024-01-01' },
    { o: { d: 'y', e: new Date('2024-02-02T00:00Z') }, e: 'd.Y_e.2024-02-02' },
  ])('Should encode/decode "$e"', ({ o, e }) => {
    const encoder = new ObjectEncoder({
      a: new BooleanEncoder(),
      b: new IntegerEncoder(),
      c: new StringEncoder(),
      d: new EnumEncoder({ x: 'X', y: 'Y' }),
      e: new DateEncoder(),
    });
    expect(encoder.encode(o)).toBe(e);
    expect(encoder.decode(e)).toStrictEqual(o);
  });

  test.each([
    { o: null, e: '~' },
    { o: {}, e: '' },
    { o: { a: null }, e: 'a.!~' },
    { o: { a: {} }, e: 'a.' },
    { o: { a: { b: null } }, e: 'a.b!.!!!~' },
    { o: { a: { b: '' } }, e: 'a.b!.' },
    { o: { a: { b: 'A' } }, e: 'a.b!.A' },
    { o: { a: { b: 'A B' } }, e: 'a.b!.A%20B' },
    { o: { a: { b: 'A!B' } }, e: 'a.b!.A!!!!!!!!B' },
  ])('Nested - Should encode/decode $e', ({ o, e }) => {
    const encoder = new ObjectEncoder({
      a: new ObjectEncoder({
        b: new StringEncoder(),
      }),
    });
    expect(encoder.encode(o)).toBe(e);
    expect(encoder.decode(e)).toStrictEqual(o);
  });

  test.each([
    { o: null, e: '~' },
    { o: { a: null }, e: 'a.!~' },
    { o: { a: [] }, e: 'a.' },
    { o: { a: [1] }, e: 'a.1' },
    { o: { a: [1, 10] }, e: 'a.1!_10' },
  ])('Nested with array - Should encode/decode $e', ({ o, e }) => {
    const encoder = new ObjectEncoder({
      a: new ArrayEncoder(new IntegerEncoder()),
    });
    expect(encoder.encode(o)).toBe(e);
    expect(encoder.decode(e)).toStrictEqual(o);
  });
});

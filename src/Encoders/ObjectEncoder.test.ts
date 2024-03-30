import { describe, expect, test } from '@jest/globals';
import { BooleanEncoder } from './BooleanEncoder';
import { ObjectEncoder } from './ObjectEncoder';
import { IntegerEncoder } from './IntegerEncoder';
import { StringEncoder } from './StringEncoder';
import { EnumEncoder } from './EnumEncoder';
import { DateEncoder } from './DateEncoder';

describe('ObjectEncoder', () => {
  test('Encode & Decode - Bool, Integer and String', () => {
    const encoder = new ObjectEncoder({
      a: new BooleanEncoder(),
      b: new IntegerEncoder(),
      c: new StringEncoder(),
    });

    expect(encoder.encode({})).toBe('');
    expect(encoder.encode({ a: true })).toBe('a.t');
    expect(encoder.encode({ a: true, b: 10 })).toBe('a.t~b.10');
    expect(encoder.encode({ a: true, b: 10, c: 'A' })).toBe('a.t~b.10~c.A');
    expect(encoder.encode({ a: true, b: 10, c: 'A.B' })).toBe('a.t~b.10~c.A!.B');
    expect(encoder.encode({ a: true, b: 10, c: 'A~B' })).toBe('a.t~b.10~c.A!~B');
    expect(encoder.encode({ a: true, b: 10, c: 'A!B' })).toBe('a.t~b.10~c.A!!B');
    expect(encoder.encode({ a: true, b: 10, c: 'A!!B' })).toBe('a.t~b.10~c.A!!!!B');
    expect(encoder.encode({ a: true, b: 10, c: 'A!.B' })).toBe('a.t~b.10~c.A!!!.B');
    expect(encoder.encode({ a: true, b: 10, c: 'A.B~C!D #:/%25' })).toBe('a.t~b.10~c.A!.B!~C!!D%20%23%3A%2F%2525');

    expect(encoder.decode('')).toStrictEqual({});
    expect(encoder.decode('a.t~b.10')).toStrictEqual({ a: true, b: 10 });
    expect(encoder.decode('a.t~b.10~c.A')).toStrictEqual({ a: true, b: 10, c: 'A' });
    expect(encoder.decode('a.t~b.10~c.A!.B')).toStrictEqual({ a: true, b: 10, c: 'A.B' });
    expect(encoder.decode('a.t~b.10~c.A!~B')).toStrictEqual({ a: true, b: 10, c: 'A~B' });
    expect(encoder.decode('a.t~b.10~c.A!!B')).toStrictEqual({ a: true, b: 10, c: 'A!B' });
    expect(encoder.decode('a.t~b.10~c.A!!!!B')).toStrictEqual({ a: true, b: 10, c: 'A!!B' });
    expect(encoder.decode('a.t~b.10~c.A!!!.B')).toStrictEqual({ a: true, b: 10, c: 'A!.B' });
    expect(encoder.decode('a.t~b.10~c.A!.B!~C!!D%20%23%3A%2F%2525')).toStrictEqual({
      a: true,
      b: 10,
      c: 'A.B~C!D #:/%25',
    });
  });

  test('Encode & Decode - Enum and Date', () => {
    const encoder = new ObjectEncoder({
      a: new EnumEncoder({ x: 'X', y: 'Y' }),
      b: new DateEncoder(),
    });

    expect(encoder.encode({ a: 'x', b: new Date('2024-01-01T00:00Z') })).toBe('a.X~b.2024-01-01');
    expect(encoder.decode('a.X~b.2024-01-01')).toStrictEqual({ a: 'x', b: new Date('2024-01-01T00:00Z') });
  });
});

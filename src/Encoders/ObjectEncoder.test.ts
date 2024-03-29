import { describe, expect, test } from '@jest/globals';
import { BooleanEncoder } from './BooleanEncoder';
import { ObjectEncoder } from './ObjectEncoder';
import { IntegerEncoder } from './IntegerEncoder';
import { StringEncoder } from './StringEncoder';

describe('ObjectEncoder', () => {
  test('Encode & Decode', () => {
    const encoder = new ObjectEncoder({
      a: new BooleanEncoder(),
      b: new IntegerEncoder(),
      c: new StringEncoder(),
    });

    expect(encoder.encode({ a: true, b: 10, c: 'A' })).toBe('a.t~b.10~c.A');
    expect(encoder.encode({ a: true, b: 10, c: 'A.B' })).toBe('a.t~b.10~c.A!.B');
    expect(encoder.encode({ a: true, b: 10, c: 'A~B' })).toBe('a.t~b.10~c.A!~B');
    expect(encoder.encode({ a: true, b: 10, c: 'A!B' })).toBe('a.t~b.10~c.A!!B');
    expect(encoder.encode({ a: true, b: 10, c: 'A!!B' })).toBe('a.t~b.10~c.A!!!!B');

    expect(encoder.decode('a.t~b.10~c.A')).toStrictEqual({ a: true, b: 10, c: 'A' });
    expect(encoder.decode('a.t~b.10~c.A!.B')).toStrictEqual({ a: true, b: 10, c: 'A.B' });
    expect(encoder.decode('a.t~b.10~c.A!~B')).toStrictEqual({ a: true, b: 10, c: 'A~B' });
    expect(encoder.decode('a.t~b.10~c.A!!B')).toStrictEqual({ a: true, b: 10, c: 'A!B' });
    expect(encoder.decode('a.t~b.10~c.A!!!!B')).toStrictEqual({ a: true, b: 10, c: 'A!!B' });
  });
});

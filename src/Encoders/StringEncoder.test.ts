import { describe, expect, test } from '@jest/globals';
import { StringEncoder } from './StringEncoder';

describe('StringEncoder', () => {
  test('Encode & Decode', () => {
    const encoder = new StringEncoder();

    expect(encoder.encode('A')).toBe('A');
    expect(encoder.encode(' ')).toBe('%20');
    expect(encoder.encode(null)).toBe('');

    expect(encoder.decode('A')).toBe('A');
    expect(encoder.decode('%20')).toBe(' ');
    expect(encoder.decode('')).toBe('');
  });
});

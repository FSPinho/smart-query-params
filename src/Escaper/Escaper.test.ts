import { describe, expect, test } from '@jest/globals';
import { Escaper } from './Escaper';

describe('Escaper', () => {
  test('Escape', () => {
    const escaper = new Escaper({ escapeChar: '|', escapableChars: ['a'] });

    expect(escaper.escape('a')).toBe('|a');
    expect(escaper.escape('aa')).toBe('|a|a');
    expect(escaper.escape('|')).toBe('||');
    expect(escaper.escape('|a')).toBe('|||a');
    expect(escaper.escape('|a|a')).toBe('|||a|||a');
    expect(escaper.escape('abc')).toBe('|abc');
    expect(escaper.escape('|abc')).toBe('|||abc');

    expect(escaper.unescape('|a')).toBe('a');
    expect(escaper.unescape('|a|a')).toBe('aa');
    expect(escaper.unescape('||')).toBe('|');
    expect(escaper.unescape('|||a')).toBe('|a');
    expect(escaper.unescape('|||a|||a')).toBe('|a|a');
    expect(escaper.unescape('|||abc')).toBe('|abc');
  });

  test('Unescape', () => {});
});

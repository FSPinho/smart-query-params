import { BaseEncoder } from './BaseEncoder';
import { Escaper } from '../Escaper/Escaper';

const NULL_VALUE = '-';
const ESCAPE = '~';

const ESCAPER = new Escaper({ escapeChar: ESCAPE, escapableChars: [NULL_VALUE] });

export class StringEncoder extends BaseEncoder<string> {
  public encode(t: string | null): string {
    if (t === null || t === undefined) return NULL_VALUE;

    this.validateToEncode(t);

    return encodeURIComponent(ESCAPER.escape(t));
  }

  private validateToEncode(value: any) {
    const isString = typeof value === 'string';
    !isString && this.throwInvalidValue(String(value));
  }

  public decode(s: string): string | null {
    return s === NULL_VALUE ? null : ESCAPER.unescape(decodeURIComponent(s));
  }
}

import { BaseEncoder } from './BaseEncoder';
import { Escaper } from '../Escaper/Escaper';

const NULL_VALUE = '~';
const ESCAPE = '!';

const ESCAPER = new Escaper({ escapeChar: ESCAPE, escapableChars: [NULL_VALUE] });

export class StringEncoder extends BaseEncoder<string> {
  public encode(t: string | null): string {
    return t === null ? NULL_VALUE : encodeURIComponent(ESCAPER.escape(t));
  }

  public decode(s: string): string | null {
    return s === NULL_VALUE ? null : ESCAPER.unescape(decodeURIComponent(s));
  }
}

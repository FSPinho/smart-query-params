import { BaseEncoder } from './BaseEncoder';
import { Escaper } from '../Escaper/Escaper';

const NULL_VALUE = '-';
const SEPARATOR = '_';
const ESCAPE = '~';

const ESCAPER = new Escaper({ escapeChar: ESCAPE, escapableChars: [NULL_VALUE, SEPARATOR] });

export class ArrayEncoder<
  E extends BaseEncoder<any>,
  IA extends Array<(E extends BaseEncoder<infer T> ? T : unknown) | null>,
> extends BaseEncoder<IA> {
  constructor(private itemEncoder: E) {
    super();
  }

  public encode(arr: IA | null | undefined): string {
    if (arr === null || arr === undefined) return NULL_VALUE;

    this.validateToEncode(arr);

    return arr
      .map((val) => {
        return ESCAPER.escape(this.itemEncoder.encode(val));
      })
      .join(SEPARATOR);
  }

  private validateToEncode(value: any) {
    const isArray = typeof value === 'object' && typeof value.forEach === 'function';
    !isArray && this.throwInvalidValue(String(value));
  }

  public decode(s: string): IA | null {
    if (s === NULL_VALUE) return null;
    const values = this.decodeValues(s);
    return values.map((value) => this.itemEncoder.decode(ESCAPER.unescape(value))) as IA;
  }

  private decodeValues(s: string): Array<string> {
    const props: Array<string> = [];

    while (s.length) {
      const match = s.match(new RegExp(`[^${ESCAPER.getRegexSafeChar(ESCAPE)}]${ESCAPER.getRegexSafeChar(SEPARATOR)}`));
      if (!match || match.index === undefined) {
        props.push(s);
        break;
      }
      props.push(s.slice(0, match.index + 1));
      s = s.slice(match.index + 2);
    }

    return props;
  }
}

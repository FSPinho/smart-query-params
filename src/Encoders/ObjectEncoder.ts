import { BaseEncoder } from './BaseEncoder';
import { Escaper } from '../Escaper/Escaper';

const NULL_VALUE = '~';
const KEY_VALUE_SEPARATOR = '.';
const SEPARATOR = '_';
const ESCAPE = '!';

const ESCAPER = new Escaper({ escapeChar: ESCAPE, escapableChars: [NULL_VALUE, KEY_VALUE_SEPARATOR, SEPARATOR] });

export class ObjectEncoder<
  SCH extends { [key: string]: BaseEncoder<any> },
  OBJ extends {
    [key in keyof SCH]?: SCH[key] extends BaseEncoder<infer T> ? T : unknown;
  },
> extends BaseEncoder<OBJ> {
  constructor(private schema: SCH) {
    super();
    this.validateSchema();
  }

  public encode(obj: OBJ | null): string {
    if (obj === null) return NULL_VALUE;
    return Object.entries(obj)
      .map(([key, val]) => {
        const encodedVal = this.schema[key].encode(val);
        return [ESCAPER.escape(key), KEY_VALUE_SEPARATOR, ESCAPER.escape(encodedVal)].join('');
      })
      .join(SEPARATOR);
  }

  public decode(s: string): OBJ | null {
    if (s === NULL_VALUE) return null;

    const keyValues = this.decodeKeyValues(s);

    return keyValues.reduce((acc, keyValue) => {
      const match = keyValue.match(new RegExp(`[^${ESCAPE}]${KEY_VALUE_SEPARATOR}`));
      if (!match || match.index === undefined) return;

      const key = ESCAPER.unescape(keyValue.slice(0, match.index + 1));
      const value = ESCAPER.unescape(keyValue.slice(match.index + 2));
      const decodedValue = this.schema[key].decode(value);

      return { ...acc, [key]: decodedValue };
    }, {} as any);
  }

  private decodeKeyValues(s: string): Array<string> {
    const props: Array<string> = [];

    while (s.length) {
      const match = s.match(new RegExp(`[^${ESCAPE}]${SEPARATOR}`));
      if (!match || match.index === undefined) {
        props.push(s);
        break;
      }
      props.push(s.slice(0, match.index + 1));
      s = s.slice(match.index + 2);
    }

    return props;
  }

  private validateSchema() {
    for (const [prop, propEncoder] of Object.entries(this.schema)) {
      if (propEncoder instanceof ObjectEncoder) {
        // throw new Error(`Nested objects are not supported. Received an ObjectEncoder for the prop "${prop}"`);
      }
    }
  }
}

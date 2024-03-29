import { BaseEncoder } from './BaseEncoder';

const DEF_PROP_VAL_SEPARATOR = '.';
const DEF_PROPS_SEPARATOR = '~';
const DEF_SCAPE = '!';

export class ObjectEncoder<
  SCH extends { [key: string]: BaseEncoder<any> },
  OBJ extends {
    [key in keyof SCH]?: SCH[key] extends BaseEncoder<infer T> ? T : unknown;
  },
> extends BaseEncoder<OBJ> {
  constructor(private schema: SCH) {
    super();
  }

  public encode(obj: OBJ): string {
    return Object.entries(obj)
      .map(([key, val]) => {
        const encodedVal = this.schema[key].encode(val);
        return `${this.scape(key)}${DEF_PROP_VAL_SEPARATOR}${this.scape(encodedVal)}`;
      })
      .join(DEF_PROPS_SEPARATOR);
  }

  public decode(s: string): OBJ {
    const keyValues = this.decodeKeyValues(s);

    return Object.values(keyValues).reduce((acc, keyValue) => {
      const match = keyValue.match(new RegExp(`[^${DEF_SCAPE}]${DEF_PROP_VAL_SEPARATOR}`));
      if (!match || match.index === undefined) return;

      const key = this.undoScape(keyValue.slice(0, match.index + 1));
      const value = this.undoScape(keyValue.slice(match.index + 2));
      const decodedValue = this.schema[key].decode(value);

      return { ...acc, [key]: decodedValue };
    }, {} as any);
  }

  private decodeKeyValues(s: string): Array<string> {
    const props: Array<string> = [];

    while (s.length) {
      const match = s.match(new RegExp(`[^${DEF_SCAPE}]${DEF_PROPS_SEPARATOR}`));
      if (!match || match.index === undefined) {
        props.push(s);
        break;
      }
      props.push(s.slice(0, match.index + 1));
      s = s.slice(match.index + 2);
    }

    return props;
  }

  private scape(s: string) {
    return s.replace(
      new RegExp(`(\\${DEF_PROP_VAL_SEPARATOR}|${DEF_PROPS_SEPARATOR}|${DEF_SCAPE})`, 'g'),
      `${DEF_SCAPE}$1`,
    );
  }

  private undoScape(s: string) {
    return s.replace(
      new RegExp(`${DEF_SCAPE}(\\${DEF_PROP_VAL_SEPARATOR}|${DEF_PROPS_SEPARATOR}|${DEF_SCAPE})`, 'g'),
      '$1',
    );
  }
}

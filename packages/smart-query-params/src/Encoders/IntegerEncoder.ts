import { BaseEncoder } from './BaseEncoder';

export class IntegerEncoder extends BaseEncoder<number> {
  public encode(t: number | null): string {
    return t === null ? '' : String(t);
  }

  public decode(s: string): number | null {
    if (!s.match(/^\d+$/)) return null;
    return parseInt(s);
  }
}

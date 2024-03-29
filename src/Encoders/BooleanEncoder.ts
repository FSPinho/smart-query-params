import { BaseEncoder } from './BaseEncoder';

export class BooleanEncoder extends BaseEncoder<boolean> {
  public encode(t: boolean | null): string {
    return t === null ? '' : t ? 't' : 'f';
  }

  public decode(s: string): boolean | null {
    if (!['t', 'f'].includes(s)) return null;
    return s === 't';
  }
}

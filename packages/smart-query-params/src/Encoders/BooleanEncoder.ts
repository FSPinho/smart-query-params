import { BaseEncoder } from './BaseEncoder';

export class BooleanEncoder extends BaseEncoder<boolean> {
  public encode(t: boolean | null): string {
    if (t === null || t === undefined) return '';

    this.validateToEncode(t);

    return t ? 't' : 'f';
  }

  private validateToEncode(value: any) {
    const isBool = typeof value === 'boolean';
    !isBool && this.throwInvalidValue(String(value));
  }

  public decode(s: string): boolean | null {
    if (!['t', 'f'].includes(s)) return null;
    return s === 't';
  }
}

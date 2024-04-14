import { BaseEncoder } from './BaseEncoder';

export class IntegerEncoder extends BaseEncoder<number> {
  public encode(t: number | null): string {
    if (t === null || t === undefined) {
      return '';
    }

    this.validateToEncode(t);

    return String(t);
  }

  private validateToEncode(value: any) {
    const isInteger = Number.isInteger(value);
    !isInteger && this.throwInvalidValue(String(value));
  }

  public decode(s: string): number | null {
    if (!s.match(/^\d+$/)) return null;
    return parseInt(s);
  }
}

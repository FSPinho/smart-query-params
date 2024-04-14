import { BaseEncoder } from './BaseEncoder';

export class DateEncoder extends BaseEncoder<Date> {
  public encode(t: Date | null): string {
    if (t === null || t === undefined) {
      return '';
    }

    this.validateToEncode(t);

    return encodeURIComponent(t.toISOString().slice(0, 10));
  }

  private validateToEncode(value: any) {
    const isDate = value instanceof Date && !isNaN(+value);
    !isDate && this.throwInvalidValue(String(value));
  }

  public decode(s: string): Date | null {
    const date = new Date(s + 'T00:00Z');
    return isNaN(+date) ? null : date;
  }
}

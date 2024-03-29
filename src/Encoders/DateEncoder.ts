import { BaseEncoder } from './BaseEncoder';

export class DateEncoder extends BaseEncoder<Date> {
  public encode(t: Date | null): string {
    return encodeURIComponent(t ? t.toISOString().slice(0, 10) : '');
  }

  public decode(s: string): Date | null {
    return s ? new Date(s + 'T00:00Z') : null;
  }
}

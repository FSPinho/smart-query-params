import { BaseEncoder } from './BaseEncoder';

export class StringEncoder extends BaseEncoder<string> {
  public encode(t: string | null): string {
    return encodeURIComponent(t ?? '');
  }

  public decode(s: string): string | null {
    return decodeURIComponent(s);
  }
}

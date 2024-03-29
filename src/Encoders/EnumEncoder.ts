import { BaseEncoder } from './BaseEncoder';

export class EnumEncoder<
  KV extends { [key: string]: string },
  K extends keyof KV,
> extends BaseEncoder<keyof KV> {
  constructor(private keyValueMap: KV) {
    super();
  }

  public encode(k: K | null): string {
    return k ? this.keyValueMap[k] : '';
  }

  public decode(v: string): K | null {
    const value = Object.entries(this.keyValueMap)
      .filter(([, val]) => val === v)
      .map(([key]) => key)[0] as K | null;
    if (!value) return null;
    return value;
  }
}

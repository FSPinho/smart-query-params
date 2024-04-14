import { BaseEncoder } from './BaseEncoder';

export class EnumEncoder<KV extends { [key: string]: string }, K extends keyof KV> extends BaseEncoder<keyof KV> {
  constructor(private keyValueMap: KV) {
    super();
  }

  public encode(k: K | null): string {
    if (k === null || k === undefined) {
      return '';
    }

    this.validateToEncode(k);

    return this.keyValueMap[k];
  }

  private validateToEncode(value: any) {
    const isValid = value in this.keyValueMap;
    !isValid && this.throwInvalidValue(String(value));
  }

  public decode(v: string): K | null {
    const value = (Object.entries(this.keyValueMap) as Array<[string, string]>)
      .filter(([, val]) => val === v)
      .map(([key]) => key)[0] as K | null;
    if (!value) return null;
    return value;
  }
}

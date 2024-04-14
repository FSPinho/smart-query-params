export abstract class BaseEncoder<T> {
  public abstract encode(t: T | null): string;
  public abstract decode(s: string): T | null;

  public throwInvalidValue(valueStr: string): void {
    throw new Error(`${this.constructor.name} can't encode the value "${valueStr}"`);
  }
}

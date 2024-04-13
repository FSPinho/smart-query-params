export abstract class BaseEncoder<T> {
  public abstract encode(t: T | null): string;
  public abstract decode(s: string): T | null;
}

export class Escaper {
  constructor(
    private options: {
      escapeChar: string;
      escapableChars: Array<string>;
    },
  ) {}

  public escape(s: string): string {
    if (!this.options.escapableChars.length) return s;
    const chars = [this.options.escapeChar, ...this.options.escapableChars];
    return s.replace(
      new RegExp(`(${chars.map(this.getRegexSafeChar).join('|')})`, 'g'),
      `${this.options.escapeChar}$1`,
    );
  }

  public unescape(s: string): string {
    if (!this.options.escapableChars.length) return s;
    const chars = [this.options.escapeChar, ...this.options.escapableChars];
    return s.replace(
      new RegExp(
        `${this.getRegexSafeChar(this.options.escapeChar)}(${chars.map(this.getRegexSafeChar).join('|')})`,
        'g',
      ),
      '$1',
    );
  }

  public getRegexSafeChar(char: string) {
    if ('\\^$.|?*+()[]{}'.includes(char)) {
      return `\\${char}`;
    }
    return char;
  }
}

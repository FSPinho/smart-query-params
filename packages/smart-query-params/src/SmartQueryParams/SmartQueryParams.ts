import { EncoderFactory } from '../Encoders/EncoderFactory';
import { BaseEncoder } from '../Encoders/BaseEncoder';
import { QueryParams } from '../QueryParams/QueryParams';
import { QueryParamsListener } from '../QueryParams/QueryParamsListener';

export interface Options<SCH extends Schema> {
  schema: SCH | ((factory: EncoderFactory) => SCH);
}

export interface Schema {
  [key: string]: BaseEncoder<any>;
}

export interface Listener {
  type: EventType;
  handler: (event: Event) => void;
}

export interface Event {
  type: EventType;
}

export type EventType = 'change';

export class SmartQueryParams<
  SCH extends Schema,
  OBJ extends {
    [key in keyof SCH]: (SCH[key] extends BaseEncoder<infer T> ? T : unknown) | null;
  },
> {
  private readonly schema: Schema;
  private readonly queryParams: QueryParams;
  private readonly queryParamsListener: QueryParamsListener;
  private listeners: Array<Listener> = [];

  constructor({ schema }: Options<SCH>) {
    if (typeof schema === 'function') {
      this.schema = schema(new EncoderFactory());
    } else {
      this.schema = schema;
    }

    this.queryParams = new QueryParams();
    this.queryParamsListener = new QueryParamsListener(() => this.handleParamsChange());
  }

  public addEventListener(type: Listener['type'], handler: Listener['handler']) {
    this.listeners.push({ type, handler });
    return () => {
      this.listeners = this.listeners.filter((l) => (l.handler === handler ? l.type !== type : true));
    };
  }

  public pushParams(params: Partial<OBJ>): void {
    this.queryParams.pushParams(this.encodeParams(params));
  }

  public replaceParams(params: Partial<OBJ>): void {
    this.queryParams.replaceParams(this.encodeParams(params));
  }

  public getParams(): OBJ {
    return this.decodeParams();
  }

  private encodeParams(params: Partial<OBJ>) {
    const rawParams: any = {};

    for (const [name, encoder] of Object.entries(this.schema)) {
      const value = params[name] ?? null;
      rawParams[name] = encoder.encode(value);
    }

    return rawParams;
  }

  private decodeParams() {
    const rawParams = this.queryParams.getParams();
    const params: any = {};

    for (const [name, encoder] of Object.entries(this.schema)) {
      const raw = rawParams[name];
      params[name] = typeof raw === 'undefined' ? null : encoder.decode(raw);
    }

    return params as OBJ;
  }

  public destroy() {
    this.listeners = [];
    this.queryParamsListener.disconnect();
  }

  private handleParamsChange() {
    this.listeners.filter(({ type }) => type === 'change').forEach(({ type, handler }) => handler({ type }));
  }
}

import { StringEncoder } from './StringEncoder';
import { IntegerEncoder } from './IntegerEncoder';
import { BooleanEncoder } from './BooleanEncoder';
import { DateEncoder } from './DateEncoder';
import { EnumEncoder } from './EnumEncoder';
import { ObjectEncoder } from './ObjectEncoder';
import { BaseEncoder } from './BaseEncoder';
import { ArrayEncoder } from './ArrayEncoder';

export class EncoderFactory {
  public static build(getEncoder: (factory: EncoderFactory) => BaseEncoder<any>) {
    return getEncoder(new EncoderFactory());
  }

  public string() {
    return new StringEncoder();
  }

  public integer() {
    return new IntegerEncoder();
  }

  public boolean() {
    return new BooleanEncoder();
  }

  public date() {
    return new DateEncoder();
  }

  public enum(keyValueMap: { [key: string]: string }) {
    return new EnumEncoder(keyValueMap);
  }

  public object(schema: { [key: string]: BaseEncoder<any> }) {
    return new ObjectEncoder(schema);
  }

  public array(itemEncoder: BaseEncoder<any>) {
    return new ArrayEncoder(itemEncoder);
  }
}

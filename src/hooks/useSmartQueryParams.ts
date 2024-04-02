import { BaseEncoder } from '../Encoders/BaseEncoder';
import { EncoderFactory } from '../Encoders/EncoderFactory';

export interface UseQueryParamsOptions<E extends BaseEncoder<any>> {
  encoder: EncGetter<E>;
}

export type Enc = BaseEncoder<any>;
export type EncGetter<E extends Enc> = (f: EncoderFactory) => E;

export function useSmartQueryParams<E extends Enc>(getEncoder: EncGetter<E>): void;
export function useSmartQueryParams<E extends Enc>(options: UseQueryParamsOptions<E>): void;
export function useSmartQueryParams<E extends Enc>(schemaOrOptions: EncGetter<E> | UseQueryParamsOptions<E>): void {
  const options: UseQueryParamsOptions<E> = isOptions(schemaOrOptions) ? schemaOrOptions : { encoder: schemaOrOptions };
}

function isOptions<E extends Enc>(obj: any): obj is UseQueryParamsOptions<E> {
  return obj.hasOwnProperty('encoder');
}

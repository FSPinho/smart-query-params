import { useMemo } from 'react';
import { Options, Schema } from 'smart-query-params';

export interface UseSmartQueryParamsReturn {}

export function useSmartQueryParams<SCH extends Schema>(schema: Options<SCH>['schema']): UseSmartQueryParamsReturn;
export function useSmartQueryParams<SCH extends Schema>(options: Options<SCH>): UseSmartQueryParamsReturn;
export function useSmartQueryParams<SCH extends Schema>(
  schemaOrOptions: Options<SCH> | Options<SCH>['schema'],
): UseSmartQueryParamsReturn {
  const options: Options<SCH> = useMemo(
    () => (isOptions(schemaOrOptions) ? schemaOrOptions : { schema: schemaOrOptions }),
    [],
  );

  return {};
}

function isOptions<SCH extends Schema>(obj: any): obj is Options<SCH> {
  return obj.hasOwnProperty('encoder');
}

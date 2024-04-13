import { useMemo } from 'react';
import { Options, Schema } from 'smart-query-params';

export function useSmartQueryParams<SCH extends Schema>(schema: Options<SCH>['schema']): void;
export function useSmartQueryParams<SCH extends Schema>(options: Options<SCH>): void;
export function useSmartQueryParams<SCH extends Schema>(schemaOrOptions: Options<SCH> | Options<SCH>['schema']): void {
  const options: Options<SCH> = useMemo(
    () => (isOptions(schemaOrOptions) ? schemaOrOptions : { schema: schemaOrOptions }),
    [],
  );
}

function isOptions<SCH extends Schema>(obj: any): obj is Options<SCH> {
  return obj.hasOwnProperty('encoder');
}

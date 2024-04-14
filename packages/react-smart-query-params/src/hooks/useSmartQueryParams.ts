import { useCallback, useEffect, useMemo, useState } from 'react';
import { Options, Schema, SchemaOutObject, SmartQueryParams } from 'smart-query-params';

export type UseSmartQueryParamsOptions<SCH extends Schema, OBJ extends SchemaOutObject<SCH>> = Options<SCH> & {
  fallbackValues?: OBJ;
};

export type UseSmartQueryParamsReturn<SCH extends Schema, OBJ extends SchemaOutObject<SCH>> = {
  params: OBJ;
  pushParams: SmartQueryParams<SCH, OBJ>['pushParams'];
  replaceParams: SmartQueryParams<SCH, OBJ>['replaceParams'];
};

export function useSmartQueryParams<SCH extends Schema, OBJ extends SchemaOutObject<SCH>>({
  fallbackValues,
  ...options
}: UseSmartQueryParamsOptions<SCH, OBJ>): UseSmartQueryParamsReturn<SCH, OBJ> {
  const smartQueryParams = useMemo(() => new SmartQueryParams<SCH, OBJ>(options), []);

  const [internalParams, setInternalParams] = useState<OBJ>(() => smartQueryParams.getParams());

  useEffect(() => {
    const unbind = smartQueryParams.addEventListener('change', () => {
      setInternalParams(smartQueryParams.getParams());
    });
    return () => unbind();
  }, []);

  const params = useMemo<OBJ>(() => {
    const params: any = {};
    for (const [key, val] of Object.entries(internalParams)) {
      params[key] = val ?? ((fallbackValues ?? {}) as any)[key] ?? null;
    }
    return params;
  }, [internalParams]);

  return {
    params,
    pushParams: useCallback((...args) => smartQueryParams.pushParams(...args), []),
    replaceParams: useCallback((...args) => smartQueryParams.replaceParams(...args), []),
  };
}

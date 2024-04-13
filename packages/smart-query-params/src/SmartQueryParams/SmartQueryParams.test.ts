import { describe, expect, test } from '@jest/globals';
import { SmartQueryParams } from './SmartQueryParams';

describe('SmartQueryParams', () => {
  test('Basic', () => {
    const smartQueryParams = new SmartQueryParams({
      schema: (f) => ({
        name: f.string(),
        age: f.integer(),
      }),
    });

    expect(smartQueryParams.getParams()).toStrictEqual({ name: null, age: null });

    smartQueryParams.pushParams({ name: 'A' });
    expect(smartQueryParams.getParams()).toStrictEqual({ name: 'A', age: null });

    smartQueryParams.pushParams({ name: 'A', age: 10 });
    expect(smartQueryParams.getParams()).toStrictEqual({ name: 'A', age: 10 });
  });

  test('Listeners', () => {
    const smartQueryParams = new SmartQueryParams({
      schema: (f) => ({
        name: f.string(),
      }),
    });

    const state = { listenerCalls: 0 };
    const handler = () => (state.listenerCalls += 1);

    smartQueryParams.pushParams({ name: 'A' });
    expect(smartQueryParams.getParams()).toStrictEqual({ name: 'A' });
    expect(state.listenerCalls).toStrictEqual(0);

    const unbind = smartQueryParams.addEventListener('change', handler);

    smartQueryParams.pushParams({ name: 'B' });
    expect(smartQueryParams.getParams()).toStrictEqual({ name: 'B' });
    expect(state.listenerCalls).toStrictEqual(1);

    smartQueryParams.pushParams({ name: 'C' });
    expect(smartQueryParams.getParams()).toStrictEqual({ name: 'C' });
    expect(state.listenerCalls).toStrictEqual(2);

    unbind();

    smartQueryParams.pushParams({ name: 'D' });
    expect(smartQueryParams.getParams()).toStrictEqual({ name: 'D' });
    expect(state.listenerCalls).toStrictEqual(2);
  });
});

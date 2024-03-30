import { describe, expect, test, xtest } from '@jest/globals';
import { QueryParams } from './QueryParams';
import { QueryParamsListener } from './QueryParamsListener';

describe('QueryParams', () => {
  test('setParams', () => {
    const queryParams = new QueryParams();

    expect(queryParams.getParams()).toStrictEqual({});

    queryParams.pushParams({ x: 'X' });
    expect(queryParams.getParams()).toStrictEqual({ x: 'X' });

    queryParams.pushParams({});
    expect(queryParams.getParams()).toStrictEqual({});

    queryParams.pushParams({ y: 'Y', z: 'Z' });
    expect(queryParams.getParams()).toStrictEqual({ y: 'Y', z: 'Z' });
  });

  test('Listener', () => {
    const state = { wasListenerCalled: false };

    const queryParams = new QueryParams();
    new QueryParamsListener(() => {
      state.wasListenerCalled = true;
    });

    expect(state.wasListenerCalled).toBe(false);
    queryParams.pushParams({ x: 'X' });
    expect(state.wasListenerCalled).toBe(true);
    expect(queryParams.getParams()).toStrictEqual({ x: 'X' });
  });

  test('Listeners disconnect', () => {
    const state = { wasListenerCalled: false };

    const queryParams = new QueryParams();
    new QueryParamsListener(() => {
      state.wasListenerCalled = true;
    }).disconnect();

    expect(state.wasListenerCalled).toBe(false);
    queryParams.pushParams({ x: 'X' });
    expect(state.wasListenerCalled).toBe(false);
    expect(queryParams.getParams()).toStrictEqual({ x: 'X' });
  });
});

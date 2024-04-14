import React, { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useSmartQueryParams } from 'react-smart-query-params';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);

const DEF_VALUES = {
  name: 'Felipe',
  age: 29,
  active: true,
  type: 'normal',
  phones: ['000', '111'],
  address: {
    street: 'Iberville',
    city: 'Montreal',
  },
  nested: {
    arr: [{ value: 10 }],
  },
};

function App() {
  const { params, pushParams } = useSmartQueryParams({
    schema: (f) => ({
      name: f.string(),
      age: f.integer(),
      active: f.boolean(),
      type: f.enum({ normal: 'N', complex: 'C' }),
      phones: f.array(f.string()),
      address: f.object({
        street: f.string(),
        city: f.string(),
      }),
      nested: f.object({
        arr: f.array(f.object({ value: f.integer() })),
      }),
    }),
  });

  const [paramsJson, setParamsJson] = useState(() => JSON.stringify(params, null, 2));
  const [jsonError, setJsonError] = useState('');
  const [schemaError, setSchemaError] = useState('');

  const updateParams = useCallback((params) => {
    pushParams(params, { autoClear: true });
  }, []);

  const handleChange = useCallback(({ target: { value } }) => {
    setParamsJson(value);

    try {
      const parsedJson = JSON.parse(value);
      setJsonError('');

      try {
        updateParams(parsedJson);
        setSchemaError('');
      } catch (error) {
        setSchemaError(error.message);
      }
    } catch (error) {
      setJsonError(error.message);
    }
  }, []);

  const setDefaultValues = useCallback(() => {
    updateParams(DEF_VALUES);
    setParamsJson(JSON.stringify(DEF_VALUES, null, 2));
  }, [paramsJson]);

  const clearValues = useCallback(() => {
    updateParams({});
    setParamsJson(JSON.stringify({}, null, 2));
  }, [paramsJson]);

  const formatJSONInput = useCallback(() => {
    setParamsJson(JSON.stringify(JSON.parse(paramsJson), null, 2));
  }, [paramsJson]);

  return (
    <main>
      <h1>Example with React</h1>

      <pre className={'params-box'}>{JSON.stringify(params, null, 2)}</pre>
      <pre className={'params-box'}>
        Query params: {decodeURIComponent(window.location.search).replace(/([?&])/g, '\n  ')}
      </pre>

      <textarea onChange={handleChange} value={paramsJson} rows={15} cols={70} />

      <div className={'actions'}>
        <button onClick={setDefaultValues}>Set default values</button>

        <button onClick={clearValues}>Clear values</button>

        <button onClick={formatJSONInput} disabled={!!jsonError}>
          Format JSON
        </button>
      </div>

      <p className={'params-error'}>{!!jsonError ? 'Invalid params json!' : schemaError}</p>
    </main>
  );
}

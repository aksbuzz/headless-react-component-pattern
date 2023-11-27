import { ReactNode, useCallback, useState } from 'react';

export type FormErrors = Record<string, ReactNode>;
export type FormStatus = Record<string, boolean>;

export type SetValues<Values> = React.Dispatch<React.SetStateAction<Values>>;
export type SetFieldValue<Values> = <Field extends keyof Values>(
  path: Field,
  value: Field extends keyof Values ? Values[Field] : unknown
) => void;

export type SetErrors = React.Dispatch<React.SetStateAction<FormErrors>>;
export type SetFieldError<Values> = <Field extends keyof Values>(
  path: Field,
  error: ReactNode
) => void;
export type ClearErrors = () => void;

export type ClearFieldError = (path: unknown) => void;
export type ClearFieldDirty = (path: unknown) => void;

// export type FormValidateInput<Values> = (values: Values) => FormErrors;

export type useFormProps<Values> = {
  initialValues?: Values;
  initialErrors?: FormErrors;
  initialTouched?: FormStatus;
  initialDirty?: FormStatus;
  // validate?: FormValidateInput<Values>;
  // onValuesChange?: (values: Values) => void;
};

function filterErrors(errors: FormErrors): FormErrors {
  if (errors === null || typeof errors !== 'object') return {};

  return Object.keys(errors).reduce<FormErrors>((acc, key) => {
    const errVal = errors[key];
    if (errVal !== undefined && errVal !== null && errVal !== false) {
      acc[key] = errVal;
    }
    return acc;
  }, {});
}

function clearListState<T extends Record<PropertyKey, any>>(
  field: PropertyKey,
  state: T
): T {
  if (state === null || typeof state !== 'object') {
    return {} as T;
  }

  const clone = { ...state };
  Object.keys(state).forEach((errorKey) => {
    if (errorKey.includes(`${String(field)}.`)) {
      delete clone[errorKey];
    }
  });

  return clone;
}


export function useForm<Values extends Record<string, unknown>>(props: useFormProps<Values> = {}) {
  const {
    initialValues = {} as Values,
    initialErrors = {},
    initialDirty = {},
    initialTouched = {},
    // onValuesChange,
  } = props;

  const [touched, setTouched] = useState(initialTouched);
  const [dirty, setDirty] = useState(initialDirty);
  const [values, _setValues] = useState(initialValues);
  const [errors, _setErrors] = useState(filterErrors(initialErrors));

  const clearErrors: ClearErrors = useCallback(() => _setErrors({}), []);

  const setValues: SetValues<Values> = useCallback(
    payload => {
      _setValues(prevValues => {
        const result = {
          ...prevValues,
          ...(typeof payload === 'function' ? payload(prevValues) : payload),
        };
        return result;
      });
      clearErrors();
    },
    [clearErrors]
  );

  const clearFieldDirty: ClearFieldDirty = useCallback(path => setDirty((prev) => {
    if (typeof path !== 'string') return prev

    const result = clearListState(path, prev);
    delete result[path];
    return result;
  }), [])

  const setFieldValue: SetFieldValue<Values> = useCallback((path, value) => {
    clearFieldDirty(path)
    setTouched((prev) => ({ ...prev, [path]: true }))
    _setValues((prev) => {
      const result = 
    })
  }, []);

  const setErrors: SetErrors = useCallback(
    errs => _setErrors(prev => filterErrors(typeof errs === 'function' ? errs(prev) : errs)),
    []
  );

  const setFieldError: SetFieldError<Values> = useCallback(
    (path, error) => {
      setErrors(prev => ({ ...prev, [path]: error }));
    },
    [setErrors]
  );

  const form = {
    values,
    errors,
    setValues,
    setErrors,
    setFieldValue,
    setFieldError,
  };

  return form;
}

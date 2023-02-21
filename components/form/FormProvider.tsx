import React, { useCallback } from "react";
import { useState, useContext, useMemo, ReactNode } from "react";
import { FieldInputProps, Formik, FormikProps, FormikState } from "formik";
import { InnerRef } from "./types";

export type FormContextType<FormProps> = {
  formik: () => FormikProps<FormProps> | null;
  formikRef: InnerRef<FormProps>;
  setInitialValues: (values: FormProps | null | undefined) => void;
  getInitialValues: () => FormProps | null | undefined;
  getFieldValue: <Value = any>(props: any) => Value | undefined;
  setFieldValue: FormikProps<FormProps>["setFieldValue"];
  getFieldProps: FormikProps<FormProps>["getFieldProps"];
  handleSubmit: FormikProps<FormProps>["handleSubmit"];
  getValues: () => FormProps | undefined;
  formWasSubmited: Boolean;
  setFormWasSubmited: () => void;
  resetForm: FormikProps<FormProps>["resetForm"];
};
const FormContext = React.createContext<Partial<FormContextType<any>>>({});

export const FormProvider = <FormProps,>({ children }) => {
  const [formWasSubmited, innerSetFormWasSubmited] = React.useState(false);
  const setFormWasSubmited = React.useCallback(() => {
    innerSetFormWasSubmited(true);
  }, []);
  const formikRef: InnerRef<FormProps> = React.useRef(null);
  const [initialValues, innerSetInitialValues] = useState<
    FormProps | null | undefined
  >();
  const setInitialValues = useCallback(
    (values: FormProps | null | undefined): void => {
      if (values && typeof values === "object" && !initialValues) {
        innerSetInitialValues(values);
      }
    },
    [initialValues]
  );
  const getInitialValues = useCallback((): FormProps | null | undefined => {
    return Object.assign(
      {},
      initialValues || formikRef.current?.initialValues || undefined
    );
  }, [initialValues]);
  const providerMethods = useMemo(() => {
    const formik = () => formikRef.current;
    const resetForm: FormikProps<FormProps>["resetForm"] = (
      nextState?: Partial<FormikState<FormProps>> | undefined
    ) => formikRef.current?.resetForm(nextState);
    const getFieldProps: FormikProps<FormProps>["getFieldProps"] = <Value,>(
      props: any
    ): FieldInputProps<Value> =>
      formikRef.current && typeof formikRef.current.getFieldProps === "function"
        ? formikRef.current.getFieldProps(props)
        : {
            name: null as any as string,
            value: null as any as Value,
            onChange: () => {
              throw new Error("Formik onChange has not yet implemented!");
            },
            onBlur: () => {
              throw new Error("Formik onBlur has not yet implemented!");
            },
          };
    const getFieldValue = <Value,>(props: any): Value | undefined =>
      formikRef.current && typeof formikRef.current.getFieldProps === "function"
        ? formikRef.current?.getFieldProps(props)?.value
        : undefined;
    const setFieldValue: FormikProps<FormProps>["setFieldValue"] = (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ): void => {
      if (
        formikRef.current &&
        typeof formikRef.current.getFieldProps === "function"
      ) {
        if (
          formikRef.current.getFieldProps(field).value !== value &&
          typeof formikRef.current.setFieldValue === "function"
        ) {
          formikRef.current.setFieldValue(field, value, shouldValidate);
        }
      }
    };
    const getValues = (): FormProps | undefined =>
      (formikRef.current &&
        formikRef.current.values &&
        Object.assign({}, formikRef.current.values)) ||
      undefined;
    const handleSubmit: FormikProps<FormProps>["handleSubmit"] = (
      e?: React.FormEvent<HTMLFormElement> | undefined
    ): void => {
      return formikRef.current?.handleSubmit(e);
    };
    return {
      formik,
      handleSubmit,
      getFieldValue,
      setFieldValue,
      getFieldProps,
      getValues,
      resetForm,
    };
  }, []);
  const providerConfig = useMemo(() => {
    return {
      ...providerMethods,
      formikRef,
      setInitialValues,
      getInitialValues,
      setFormWasSubmited,
      formWasSubmited,
    };
  }, [
    providerMethods,
    setInitialValues,
    getInitialValues,
    setFormWasSubmited,
    formWasSubmited,
  ]);
  return (
    <FormContext.Provider value={providerConfig}>
      {children}
    </FormContext.Provider>
  );
};
// export type UseFormProvider = <
//   FormProps
// >() => FormContextType<FormProps>;

export const useFormProvider = <FormProps,>(): FormContextType<FormProps> => {
  return useContext(FormContext) as FormContextType<FormProps>;
};
export default useFormProvider;

import React, { useCallback } from "react";
import { useState, useContext, useMemo, ReactNode } from "react";
import {
  FieldInputProps,
  Formik,
  FormikProps,
  FormikState,
  FormikValues,
  Form as FormikForm,
} from "formik";
type InnerRef<T> = React.MutableRefObject<FormikProps<T> | null>;

interface FormContextType<FormProps extends FormikValues> {
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
}
const FormContext = React.createContext<Partial<FormContextType<any>>>({});
type FormikElementProps<FormProps extends FormikValues> = React.ComponentProps<
  typeof Formik<FormProps>
>;
type ContextRef<FormProps extends FormikValues> = React.MutableRefObject<
  FormContextType<FormProps>
>;
interface Props<FormProps extends FormikValues>
  extends FormikElementProps<FormProps> {
  contextRef?: ContextRef<FormProps>;
}
export const Form = FormikForm;
export const RefFormikProvider = <FormProps extends FormikValues,>({
  children,
  contextRef,
  innerRef: _,
  ...formikProps
}: Props<FormProps>) => {
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
  if (contextRef) {
    contextRef.current = providerConfig;
  }
  return (
    <FormContext.Provider value={providerConfig}>
      <Formik innerRef={formikRef as any} {...formikProps}>
        {children}
      </Formik>
    </FormContext.Provider>
  );
};

export const useRefFormik = <FormProps extends FormikValues,>(): FormContextType<FormProps> => {
  return useContext(FormContext) as FormContextType<FormProps>;
};

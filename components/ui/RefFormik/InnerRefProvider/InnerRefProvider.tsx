import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useState, useContext, useMemo, ReactNode } from "react";
import {
  FieldInputProps,
  Formik,
  FormikProps,
  FormikState,
  FormikValues,
  Form,
  FormikHelpers,
  FormikErrors,
} from "formik";

type InnerRef<T = FormikValues> = React.MutableRefObject<FormikProps<T> | null>;

export interface FormContextType<
  FormProps extends FormikValues = FormikValues
> {
  formik: () => FormikProps<FormProps> | null;
  formikRef: InnerRef<FormProps>;
  getFieldValue: <Value = any>(props: any) => Value | undefined;
  setFieldValue: FormikProps<FormProps>["setFieldValue"];
  getFieldProps: FormikProps<FormProps>["getFieldProps"];
  handleSubmit: FormikProps<FormProps>["handleSubmit"];
  setValues: FormikProps<FormProps>["setValues"];
  resetForm: FormikProps<FormProps>["resetForm"];
  getValues: () => FormProps | undefined;
  formWasSubmited: Boolean;
  setFormWasSubmited: () => void;
  updateFormValues: (nextState?: Partial<FormProps> | undefined) => void;
}
const FormContext = React.createContext<Partial<FormContextType<any>>>({});
type FormikElementProps<FormProps extends FormikValues> = React.ComponentProps<
  typeof Formik<FormProps>
>;
export type ContextRef<FormProps extends FormikValues = FormikValues> =
  React.MutableRefObject<FormContextType<FormProps>>;
export interface Props<FormProps extends FormikValues>
  extends Omit<FormikElementProps<FormProps>, "onSubmit"> {
  children: React.ReactNode | React.ReactNode[];
  onSubmit: (
    values: FormProps,
    formikHelpers: FormikHelpers<FormProps>
  ) => void | Promise<any>;
}
interface InnerRefProps<FormProps extends FormikValues>
  extends Props<FormProps> {}

export const InnerRefFormik = forwardRef<
  FormContextType<any>,
  InnerRefProps<FormikValues>
>(function InnerRefFormik(
  {
    children,
    onSubmit,
    initialValues: formikInitialValues,
    innerRef: __innerRef,
    ...formikProps
  },
  ref
) {
  if (!formikInitialValues || typeof formikInitialValues !== "object") {
    throw new Error(
      "Incorrect formik initial values: " + typeof formikInitialValues
    );
  }
  const [formWasSubmited, innerSetFormWasSubmited] = React.useState(false);
  const setFormWasSubmited = React.useCallback(() => {
    innerSetFormWasSubmited(true);
  }, []);
  const formikRef: InnerRef<FormikValues> = React.useRef(null);
  const providerMethods = useMemo(() => {
    const formik = () => formikRef.current;
    const updateFormValues: FormikProps<any>["resetForm"] = (
      nextState?: Partial<FormikState<any>> | undefined
    ) => {
      return formikRef.current?.resetForm({
        ...formikRef.current?.values,
        ...nextState,
      });
    };
    const getFieldProps: FormikProps<FormikValues>["getFieldProps"] = <Value,>(
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
    const setFieldValue: FormikProps<FormikValues>["setFieldValue"] = (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ): Promise<void | FormikErrors<FormikValues>> => {
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
      return new Promise((resolve, reject) => {
        // console.warn("Formik has not been initialized yet.");
      });
    };
    const getValues = (): FormikValues => {
      return { ...formikRef.current?.values };
    };
    const handleSubmit: FormikProps<FormikValues>["handleSubmit"] = (
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
      updateFormValues,
    };
  }, []);
  const providerConfig: FormContextType<any> = {
    ...providerMethods,
    formikRef,
    setFormWasSubmited,
    formWasSubmited,
    setValues: (...args) => formikRef.current?.setValues(...args),
    resetForm: (...args) => formikRef.current?.resetForm(...args),
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        ...providerMethods,
        formikRef,
        setFormWasSubmited,
        formWasSubmited,
        setValues: (...args) => formikRef.current?.setValues(...args),
        resetForm: (...args) => formikRef.current?.resetForm(...args),
      };
    },
    [providerMethods, formikRef, setFormWasSubmited, formWasSubmited]
  );
  return (
    <FormContext.Provider value={providerConfig}>
      <Formik
        innerRef={formikRef as any}
        initialValues={formikInitialValues}
        validateOnChange={false}
        validateOnBlur={false}
        {...formikProps}
        onSubmit={onSubmit}
      >
        <Form>{children}</Form>
      </Formik>
    </FormContext.Provider>
  );
});

export const useRefFormik = <
  FormProps extends FormikValues
>(): FormContextType<FormProps> => {
  return useContext(FormContext) as FormContextType<FormProps>;
};

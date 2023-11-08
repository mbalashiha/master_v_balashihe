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
  FormikConfig,
  FieldConfig,
} from "formik";

export interface FormContextType<
  FormValuesType extends FormikValues = FormikValues
> {
  formikRef: React.MutableRefObject<FormikProps<FormValuesType> | undefined>;
  formik: () => FormikProps<FormValuesType> | undefined;
  handleSubmit: FormikProps<FormValuesType>["handleSubmit"];
  getFieldValue: <Value>(props: any) => Value | undefined;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<any>;
  getFieldProps: FormikProps<FormValuesType>["getFieldProps"];
  setValues: FormikProps<FormValuesType>["setValues"];
  resetForm: FormikProps<FormValuesType>["resetForm"];
  initialValues: FormikProps<FormValuesType>["initialValues"] | undefined;
  getValues: () => FormikProps<FormValuesType>["values"] | null;
}
const FormContext = React.createContext<Partial<FormContextType<any>>>({});
type FormikElementProps<FormProps extends FormikValues> = React.ComponentProps<
  typeof Formik<FormProps>
>;
export type ContextRef<FormProps extends FormikValues = FormikValues> =
  React.MutableRefObject<FormContextType<FormProps>>;

export interface Props<FormValuesType extends FormikValues>
  extends FormikElementProps<FormValuesType> {
  children: React.ReactNode | React.ReactNode[];
  ref: React.Ref<FormContextType<FormValuesType>>;
}
type CastToType = <FormValuesType extends FormikValues>(
  props: Props<FormValuesType>,
  ref: React.Ref<FormContextType<FormValuesType>>
) => JSX.Element;
function LocalFormik<FormValuesType extends FormikValues>(
  {
    children,
    onSubmit,
    initialValues: formikInitialValues,
    innerRef: __innerRef,
    ...formikProps
  }: Props<FormValuesType>,
  ref: React.Ref<FormContextType<FormValuesType>>
) {
  if (!formikInitialValues || typeof formikInitialValues !== "object") {
    throw new Error(
      "Incorrect formik initial values: " + typeof formikInitialValues
    );
  }
  const formikRef = React.useRef<FormikProps<FormValuesType>>();
  const providerMethods = useMemo(() => {
    const formik = () => formikRef.current;
    const getFieldProps: FormikProps<FormValuesType>["getFieldProps"] = <
      Value,
    >(
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
    const setFieldValue: FormikProps<FormValuesType>["setFieldValue"] = (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ): Promise<void | FormikErrors<FormValuesType>> => {
      if (
        formikRef.current &&
        typeof formikRef.current.getFieldProps === "function"
      ) {
        if (
          formikRef.current.getFieldProps(field).value !== value &&
          typeof formikRef.current.setFieldValue === "function"
        ) {
          return formikRef.current.setFieldValue(field, value, shouldValidate);
        }
      }
      return new Promise((resolve, reject) => {
        // console.warn("Formik has not been initialized yet.");
      });
    };
    const getValues = (): FormValuesType | null => {
      if (formikRef.current?.values) {
        return { ...formikRef.current?.values };
      } else return null;
    };
    const handleSubmit: FormikProps<FormValuesType>["handleSubmit"] = (
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
    };
  }, []);
  const providerConfig: FormContextType<FormValuesType> = {
    formikRef,
    formik: providerMethods.formik,
    handleSubmit: providerMethods.handleSubmit,
    getFieldValue: providerMethods.getFieldValue,
    setFieldValue: providerMethods.setFieldValue,
    getFieldProps: providerMethods.getFieldProps,
    getValues: providerMethods.getValues,
    setValues: (...args) => formikRef.current?.setValues(...args),
    resetForm: (...args) => formikRef.current?.resetForm(...args),
    get initialValues() {
      return formikRef.current?.initialValues;
    },
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        ...providerMethods,
        formikRef,
        setValues: (...args) => formikRef.current?.setValues(...args),
        resetForm: (...args) => formikRef.current?.resetForm(...args),
        get initialValues() {
          return formikRef.current?.initialValues;
        },
      };
    },
    [providerMethods, formikRef]
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
}
export const InnerRefFormik = React.forwardRef(LocalFormik) as <
  FormValuesType extends FormikValues
>(
  p: Props<FormValuesType> & {
    ref?: React.Ref<FormContextType<FormValuesType>>;
  }
) => JSX.Element;

export const useRefFormik = <
  FormProps extends FormikValues
>(): FormContextType<FormProps> => {
  return useContext(FormContext) as FormContextType<FormProps>;
};

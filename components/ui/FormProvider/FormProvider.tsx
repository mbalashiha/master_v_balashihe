import { Formik, FormikProps, FieldInputProps } from "formik";
import React, { useMemo, useContext, FC } from "react";

export type FormContextType<FormType> = {
  formik: () => FormikProps<FormType> | { isSubmitting: false };
  formikRef: React.RefObject<FormikProps<FormType>>;
  initialValues: FormType;
  getFieldValue: <Value = any>(props: any) => Value | undefined;
  setFieldValue: FormikProps<FormType>["setFieldValue"];
  getFieldProps: FormikProps<FormType>["getFieldProps"];
  handleSubmit: FormikProps<FormType>["handleSubmit"];
};
type Props<T> = {
  children: React.ReactElement | React.ReactElement[];
  initialValues?: any;
  onSubmit: (values: T, options: any) => Promise<any>;
  validate: (values: T) => any;
};

const FormContext = React.createContext<Partial<FormContextType<any>>>({});

export const FormProvider: FC<Props<any>> = <T,>({
  children,
  initialValues,
  onSubmit,
  validate,
}: Props<T>) => {
  const formikRef = React.useRef<FormikProps<T>>(null);
  const providerMethods = useMemo(() => {
    const formik = () => formikRef.current || { isSubmitting: false };
    const getFieldProps: FormikProps<T>["getFieldProps"] = <Value,>(
      props: any
    ): FieldInputProps<Value> => formikRef.current!.getFieldProps(props);
    const getFieldValue = <Value,>(props: any): Value | undefined =>
      formikRef.current?.getFieldProps(props).value;
    const setFieldValue: FormikProps<T>["setFieldValue"] = (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ): void => {
      if (formikRef.current) {
        if (formikRef.current?.getFieldProps(field).value !== value) {
          formikRef.current?.setFieldValue(field, value, shouldValidate);
        }
      }
    };
    const handleSubmit: FormikProps<T>["handleSubmit"] = (
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
    };
  }, []);
  const providerConfig = {
    ...providerMethods,
    formikRef,
    initialValues,
  };
  return (
    <Formik
      innerRef={formikRef as any}
      initialValues={
        initialValues && typeof initialValues === "object" ? initialValues : {}
      }
      validate={validate as any}
      onSubmit={onSubmit as any}
    >
      <FormContext.Provider value={providerConfig}>
        {children}
      </FormContext.Provider>
    </Formik>
  );
};

export const useFormProvider = <FormType,>(): FormContextType<FormType> => {
  return useContext(FormContext) as FormContextType<FormType>;
};

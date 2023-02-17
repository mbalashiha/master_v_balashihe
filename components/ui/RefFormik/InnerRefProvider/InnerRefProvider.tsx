import React, { useCallback, useRef } from "react";
import { useState, useContext, useMemo, ReactNode } from "react";
import {
  FieldInputProps,
  Formik,
  FormikProps,
  FormikState,
  FormikValues,
  Form,
  useField,
  FormikHelpers,
} from "formik";

type InnerRef<T> = React.MutableRefObject<FormikProps<T> | null>;

export interface FormContextType<FormProps extends FormikValues> {
  formik: () => FormikProps<FormProps> | null;
  formikRef: InnerRef<FormProps>;
  getInitialValues: () => FormProps;
  setInitialValues: (newVals: Partial<FormProps>) => void;
  getFieldValue: <Value = any>(props: any) => Value | undefined;
  setFieldValue: FormikProps<FormProps>["setFieldValue"];
  getFieldProps: FormikProps<FormProps>["getFieldProps"];
  handleSubmit: FormikProps<FormProps>["handleSubmit"];
  getValues: () => FormProps | undefined;
  formWasSubmited: Boolean;
  setFormWasSubmited: () => void;
  resetForm: FormikProps<FormProps>["resetForm"];
  destroyForm: () => any;
}
export interface MyFormikHelpers<FormProps extends FormikValues>
  extends FormikHelpers<FormProps> {
  destroyForm: () => any;
  context: FormContextType<FormProps>;
}
const FormContext = React.createContext<Partial<FormContextType<any>>>({});
type FormikElementProps<FormProps extends FormikValues> = React.ComponentProps<
  typeof Formik<FormProps>
>;
export type ContextRef<FormProps extends FormikValues> = React.MutableRefObject<
  FormContextType<FormProps>
>;
export interface Props<FormProps extends FormikValues>
  extends Omit<FormikElementProps<FormProps>, "onSubmit"> {
  children: React.ReactNode | React.ReactNode[];
  onSubmit: (
    values: FormProps,
    formikHelpers: MyFormikHelpers<FormProps>
  ) => void | Promise<any>;
}
interface InnerRefProps<FormProps extends FormikValues> extends Props<FormProps>{
    destroyForm: () => void
}
export const InnerRefFormik = <FormProps extends FormikValues>({
  children,
  destroyForm,
  onSubmit: passedOnSubmit,
  initialValues: formikInitialValues,
  innerRef: __innerRef,
  ...formikProps
}: InnerRefProps<FormProps>) => {
  if (!formikInitialValues || typeof formikInitialValues !== "object") {
    throw new Error(
      "Incorrect formik initial values: " + typeof formikInitialValues
    );
  }
  if (!passedOnSubmit) {
    throw new Error("Formkik onSubmit event handler shoud be provided!");
  }
  const [formWasSubmited, innerSetFormWasSubmited] = React.useState(false);
  const setFormWasSubmited = React.useCallback(() => {
    innerSetFormWasSubmited(true);
  }, []);
  const formikRef: InnerRef<FormProps> = React.useRef(null);
  const [initialValues, __set_initialValues] = useState<FormProps>(
    JSON.parse(JSON.stringify(formikInitialValues))
  );
  const initialValuesRef = useRef<FormProps>(initialValues);
  initialValuesRef.current = initialValues;
  const getInitialValues = useCallback((): FormProps => {
    const initialValues = initialValuesRef.current;
    return { ...initialValues };
  }, []);
  const setInitialValues = useCallback((newVals: Partial<FormProps>): void => {
    const initialValues = initialValuesRef.current;
    return __set_initialValues({ ...initialValues, ...newVals });
  }, []);
  const providerMethods = useMemo(() => {
    const formik = () => formikRef.current;
    const resetForm: FormikProps<FormProps>["resetForm"] = (
      nextState?: Partial<FormikState<FormProps>> | undefined
    ) =>
      formikRef.current?.resetForm({
        ...formikRef.current?.values,
        ...nextState,
      });
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
    const getValues = (): FormProps => {
      if (formikRef.current && formikRef.current.values) {
        return { ...formikRef.current.values };
      } else {
        const initialValues = initialValuesRef.current;
        return { ...initialValues };
      }
    };
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
      destroyForm,
    };
  }, [destroyForm]);
  const providerConfig = useMemo(() => {
    return {
      ...providerMethods,
      formikRef,
      getInitialValues,
      setInitialValues,
      setFormWasSubmited,
      formWasSubmited,
    };
  }, [
    providerMethods,
    getInitialValues,
    setInitialValues,
    setFormWasSubmited,
    formWasSubmited,
  ]);
  return (
    <FormContext.Provider value={providerConfig}>
      <Formik
        innerRef={formikRef as any}
        initialValues={formikInitialValues}
        {...formikProps}
        onSubmit={(
          values: FormProps,
          origformikHelpers: FormikHelpers<FormProps>
        ): void | Promise<any> => {
          const formikHelpers: MyFormikHelpers<FormProps> = Object.assign(
            origformikHelpers,
            {
              context: providerConfig,
              destroyForm: providerConfig.destroyForm,
            }
          );
          return passedOnSubmit(values, formikHelpers);
        }}
      >
        <Form>{children}</Form>
      </Formik>
    </FormContext.Provider>
  );
};

export const useRefFormik = <
  FormProps extends FormikValues
>(): FormContextType<FormProps> => {
  return useContext(FormContext) as FormContextType<FormProps>;
};

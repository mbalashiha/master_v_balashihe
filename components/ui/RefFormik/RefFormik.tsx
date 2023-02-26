import React, { useCallback, useRef } from "react";
import { useState, useContext, useMemo, ReactNode } from "react";
import {
  FormikValues,
  Form as FormikForm,
  useField as useFieldFormik,
} from "formik";
export const useField = useFieldFormik;
export const Form: typeof FormikForm = FormikForm;

import { InnerRefFormik, Props } from "./InnerRefProvider";
export type { FormContextType } from "./InnerRefProvider";

export const RefFormik = <FormProps extends FormikValues>(
  props: Props<FormProps>
) => {
  const [destroyed, __setDestoryed] = useState(false);
  const destroyForm = React.useCallback(() => __setDestoryed(true), []);
  return destroyed ? null : (
    <InnerRefFormik destroyForm={destroyForm} {...props} />
  );
};
export { useRefFormik } from "./InnerRefProvider";

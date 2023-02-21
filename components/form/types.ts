import React, { Suspense } from "react";
import { useContext, useMemo } from "react";
import { Formik, FormikProps } from "formik";

export type TypeOfFormik = typeof Formik;
export interface EnhancedFormikProps<FormProps> extends React.ComponentProps<TypeOfFormik> {
  formikRef: InnerRef<FormProps>;
}
export type InnerRef<T> = React.MutableRefObject<FormikProps<T> | null>;

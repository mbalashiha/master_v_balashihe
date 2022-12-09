import React from "react";
import {
  useEffect,
  useCallback,
  useState,
  useContext,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
type Props = {
  children: React.ReactElement | React.ReactElement[];
};
interface IError {
  message: string;
  header?: string | null;
  stack?: string | null;
  shakingEffect?: boolean;
  additionalKey?: string;
}
type IAddErrorArgument =
  | string
  | IError
  | { message: string; stack?: string; header?: string };
export type ErrorsContextType = {
  errors: Array<IError>;
  removeErrorAlert: (index: number) => void;
  addError: (errorObj: IAddErrorArgument) => void;
  resetErrors: () => void;
};
const ErrorsContext = React.createContext<Partial<ErrorsContextType>>({
  errors: [],
});

export const ErrorsProvider = ({ children }: Props) => {
  const [errors, setErrors] = useState<ErrorsContextType["errors"]>([]);
  const resetErrors = useCallback(() => setErrors([]), []);
  const removeErrorAlert = useCallback(
    (index: number) => {
      errors.splice(index, 1);
      setErrors(Array.from(errors));
    },
    [errors]
  );
  const addError = useCallback(
    (error: IAddErrorArgument) => {
      error =
        typeof error === "string"
          ? { message: error, stack: null, header: null }
          : {
              message: error.message,
              stack: error.stack || null,
              header: error.header || null,
            };
      let hasSameError = false;
      for (const elem of errors) {
        if (elem.message == error.message && elem.header == error.header) {
          error.shakingEffect = true;
          error.additionalKey = Date.now().toString();
          hasSameError = true;
          break;
        }
      }
      const newStateErrors = errors.filter(
        (elem) =>
          elem.message != (error as IError).message ||
          elem.header != (error as IError).header
      );
      newStateErrors.push(error);
      setErrors(newStateErrors);
    },
    [errors]
  );
  const providerValue = useMemo(() => {
    return {
      errors,
      removeErrorAlert,
      addError,
      resetErrors,
    };
  }, [errors, removeErrorAlert, addError, resetErrors]);
  return (
    <ErrorsContext.Provider value={providerValue}>
      {children}
    </ErrorsContext.Provider>
  );
};
export type UseErrorsProvider = () => ErrorsContextType;

export const useErrorsProvider: UseErrorsProvider = (): ErrorsContextType => {
  return useContext(ErrorsContext) as ErrorsContextType;
};
export default useErrorsProvider;

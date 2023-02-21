import React, { useState, useContext, useMemo, ReactNode } from "react";

type AlertType = "info" | "warning" | "error" | "success";
export interface AlertMessage {
  key: string;
  message: string;
  stack?: string;
  title?: string;
  type: AlertType;
  time: Date;
  errorConstructorName?: string;
}
export type InMessage =
  | string
  | {
      message: string;
      title?: string;
      stack?: string | undefined;
      constructor?: { name: string };
    };
interface AlertsProviderContext {
  messages: AlertMessage[];
  deleteAlert: (key: string | AlertMessage) => void;
  addError: (message: InMessage) => void;
  addSuccess: (message: InMessage) => void;
  addInfo: (message: InMessage) => void;
  addWarning: (message: InMessage) => void;
  clearAlerts: () => void;
  clearErrors: () => void;
  onlyLast: () => void;
  hasMessages: boolean;
}
const AlertsProviderContext = React.createContext<
  Partial<AlertsProviderContext>
>({});
export const AlertsProvider = ({ children }) => {
  const [messages, setMessages] = React.useState<Array<AlertMessage>>([]);
  const value = useMemo(() => {
    const hasMessages = !!messages.length;
    const onlyLast = () => {
      const newMessages: any = [];
      if (messages.length) {
        newMessages.push(messages[messages.length - 1]);
      }
      setMessages(newMessages);
    };
    const clearErrors = () => {
      setMessages(
        messages.filter((elem: AlertMessage) => elem.type !== "error")
      );
    };
    const clearAlerts = () => {
      setMessages([]);
    };
    const addError = (inError: InMessage) => {
      let messageObj;
      if (typeof inError === "string") {
        messageObj = {
          message: inError,
          stack: undefined,
          title: undefined,
          constructor: undefined,
        };
      } else {
        messageObj = {
          message: inError.message || "",
          stack: inError.stack || undefined,
          title: inError.title || undefined,
          constructor: inError.constructor || undefined,
        };
      }
      const errorConstructorName =
        inError && inError.constructor && inError.constructor.name;
      if (
        inError &&
        (inError as any).response &&
        Array.isArray((inError as any).response.errors)
      ) {
        const errors = (inError as any).response.errors as Array<any>;
        messageObj.message += errors
          .map((err) => err && err.message)
          .filter((mess) => mess)
          .join(", ");
      }
      messages.push({
        key: Date.now() + "_" + messages.length.toString(),
        time: new Date(),
        ...messageObj,
        type: "error",
        errorConstructorName,
      });
      setMessages(Array.from(messages));
    };
    const addInfo = (message: InMessage) => {
      messages.push(
        typeof message === "string"
          ? {
              key: Date.now() + "_" + messages.length.toString(),
              time: new Date(),
              message,
              type: "info",
            }
          : {
              key: Date.now() + "_" + messages.length.toString(),
              time: new Date(),
              ...message,
              type: "info",
            }
      );
      setMessages(Array.from(messages));
    };
    const addWarning = (message: InMessage) => {
      messages.push(
        typeof message === "string"
          ? {
              key: Date.now() + "_" + messages.length.toString(),
              time: new Date(),
              message,
              type: "warning",
            }
          : {
              key: Date.now() + "_" + messages.length.toString(),
              time: new Date(),
              ...message,
              type: "warning",
            }
      );
      setMessages(Array.from(messages));
    };
    const addSuccess = (message: InMessage) => {
      messages.push(
        typeof message === "string"
          ? {
              key: Date.now() + "_" + messages.length.toString(),
              time: new Date(),
              message,
              type: "success",
            }
          : {
              key: Date.now() + "_" + messages.length.toString(),
              time: new Date(),
              ...message,
              type: "success",
            }
      );
      setMessages(Array.from(messages));
    };
    const deleteAlert = (key: string | AlertMessage) => {
      key = typeof key === "string" ? key : key.key;
      setMessages(messages.filter((elem: AlertMessage) => elem.key != key));
    };
    return {
      clearAlerts,
      clearErrors,
      messages,
      deleteAlert,
      addError,
      addSuccess,
      addInfo,
      addWarning,
      onlyLast,
      hasMessages,
    };
  }, [messages]);
  return (
    <AlertsProviderContext.Provider value={value}>
      {children}
    </AlertsProviderContext.Provider>
  );
};

export const useAlertsProvider = () => {
  return useContext(AlertsProviderContext) as AlertsProviderContext;
};

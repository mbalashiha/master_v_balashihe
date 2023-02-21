import { FormContextType } from "@components/form/FormProvider";
import React, { useState, useContext, useMemo, ReactNode } from "react";
import Grow from "@mui/material/Grow";
import Collapse from "@mui/material/Collapse";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { AlertMessage, useAlertsProvider } from "./AlertsProvider";

type Props = React.ComponentProps<typeof Stack>;

export const AlertsViewer = ({ children: noChildren, ...muiProps }: Props) => {
  const { hasMessages, messages, deleteAlert } = useAlertsProvider();
  return (
    <>
      {hasMessages && (
        <Stack direction={"column"} spacing={1} {...muiProps}>
          {messages.map((alert: AlertMessage) => {
            let message = alert.message;
            let title = alert.title || "";
            if (!title && message && message.includes("(")) {
              alert.title = message.substring(0, message.indexOf("("));
              alert.message = message.substring(message.indexOf("("));
            }
            return (
              <Grow
                key={alert.key}
                in={!!alert.message}
                style={{ transformOrigin: "0 0 0 0" }}
                {...(alert.message ? { timeout: 2000 } : {})}
              >
                <Alert
                  key={alert.key}
                  severity={alert.type}
                  onClose={() => {
                    deleteAlert(alert);
                  }}
                  sx={{ maxHeight: "150px", overflow: "auto" }}
                >
                  {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
                  {alert.message}
                  {alert.stack && (
                    <pre style={{ wordBreak: "break-all" }}>{alert.stack}</pre>
                  )}
                </Alert>
              </Grow>
            );
          })}
        </Stack>
      )}
    </>
  );
};

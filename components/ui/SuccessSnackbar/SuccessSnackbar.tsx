import * as React from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessSnackbar({ message, children, ...rest }: SnackbarProps) {
  return (
    <Snackbar {...rest}>
      <Alert
        onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
          if (typeof rest.onClose === "function") {
            rest.onClose(event as any, reason as any);
          }
        }}
        severity="success"
        sx={{ width: "100%" }}
      >
        {message || children}
      </Alert>
    </Snackbar>
  );
}

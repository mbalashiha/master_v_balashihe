import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { SnackbarKey, SnackbarProvider, useSnackbar } from "notistack";

function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <Close />
    </IconButton>
  );
}
type Props = React.ComponentProps<typeof SnackbarProvider>;

export default function MuiSnackbarProvider({ children, ...props }: Props) {
  return (
    <SnackbarProvider
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
      autoHideDuration={40000}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      preventDuplicate
      {...props}
    >
      {children}
    </SnackbarProvider>
  );
}

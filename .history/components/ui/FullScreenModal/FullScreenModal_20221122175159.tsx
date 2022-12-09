import * as React from "react";
import { Button, IconButton, Stack } from "@mui/material";
import { Portal } from "react-portal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Box } from "@mui/material";
import Slide from "@mui/material/Slide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface Props {
  trigger?: React.ReactElement;
  open: boolean;
  isSubmitting?: boolean;
  onConfirm?: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
  actionButtons?: React.ReactElement | React.ReactElement[] | string;
  children: React.ReactElement | React.ReactElement[] | string;
  closeDialog: (
    event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
}
export default function FullScreenModal({
  trigger,
  open,
  actionButtons,
  onConfirm,
  children,
  closeDialog,
  isSubmitting,
}: Props) {
  const dialogPropsOnClose = React.useCallback(
    (event: {}, reason: "backdropClick" | "escapeKeyDown"): void => {
      closeDialog();
    },
    [closeDialog]
  );
  const stopPropagationEventHanlder = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    []
  );
  const mainButtonClicked = React.useCallback(
    (event: any) => {
      if (typeof onConfirm === "function") {
        onConfirm(event);
      }
    },
    [onConfirm]
  );
  return (
    <>
      {trigger}
      {!open && <>{children}</>}
      <>
        <Dialog
          fullScreen
          sx={{
            "& .MuiPaper-root": {},
          }}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            if (event) {
              event.stopPropagation();
              event.preventDefault();
            }
            closeDialog(event);
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={dialogPropsOnClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            sx={{
              p: 0,
            }}
            onClick={stopPropagationEventHanlder}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                lg={2}
                sx={{
                  paddingRight: "0.4rem",
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    lg: "column",
                  },
                }}
              >
                <Box
                  sx={{
                    alignSelf: "flex-end",
                    order: {
                      xs: 0,
                      sm: 100,
                      lg: 0,
                    },
                    flexGrow: {
                      xs: 0,
                      sm: 1,
                      lg: 0,
                    },
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={closeDialog}>
                    <CloseRoundedIcon
                      sx={{
                        fontSize: "22pt",
                      }}
                    ></CloseRoundedIcon>
                  </IconButton>
                </Box>
                {actionButtons}
              </Grid>
              <Grid
                item
                xs={12}
                lg={10}
                sx={{
                  p: 0,
                }}
              >
                {open && <>{children}</>}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </>
    </>
  );
}

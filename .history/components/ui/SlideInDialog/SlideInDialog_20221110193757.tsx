import * as React from "react";
import { Button, IconButton, Stack } from "@mui/material";
import { Portal } from "react-portal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
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
  trigger: React.ReactElement;
  open: boolean;
  isSubmitting: boolean;
  onConfirm: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
  dialogTitle: React.ReactElement | React.ReactElement[] | string;
  children: React.ReactElement | React.ReactElement[] | string;
  closeDialog: (
    event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
}
export default function SlideInDialog({
  trigger,
  open,
  onConfirm,
  dialogTitle,
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
      onConfirm(event);
    },
    [onConfirm]
  );
  return (
    <>
      {trigger}
      <Portal>
        <Dialog
          sx={{
            "& .MuiPaper-root": {
              minWidth: { xs: "98vw", md: "80vw", xl: "50vw" },
            },
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
          <DialogTitle onClick={stopPropagationEventHanlder}>
            {dialogTitle}
            <IconButton
              sx={{
                position: "absolute",
                top: "0.2rem",
                right: "0.2rem",
              }}
              onClick={closeDialog}
            >
              <CloseRoundedIcon
                sx={{
                  fontSize: "22pt",
                }}
              ></CloseRoundedIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{ p: 2, position: "relative", minHeight: "115px" }}
            onClick={stopPropagationEventHanlder}
          >
            <Box>{children}</Box>
          </DialogContent>
          <DialogActions sx={{ px: 2 }} onClick={stopPropagationEventHanlder}>
            <Button
              variant="contained"
              sx={{ "&&": { background: "gray", minWidth: "118px" } }}
              onClick={closeDialog}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={mainButtonClicked}
              disabled={isSubmitting}
            >
              Загрузить
            </Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </>
  );
}

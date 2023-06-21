import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { html as beautifyHtml } from "js-beautify";
import { TransitionProps } from "@mui/material/transitions";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";
import CodeMirrorEditor from "./CodeMirrorEditor";
import { useState } from "react";
import { grey } from "@mui/material/colors";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .DialogContent-root": {
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,
  },
  "& .DialogActions-root": {
    padding: theme.spacing(1),
    "& button": {
      borderRadius: "8px",
    },
  },
  "& .Dialog-container > div:first-of-type.Paper-root": {
    height: "100%",
    minHeight: "100vh",
    width: "1280px",
    maxWidth: "100%",
    margin: 0,
    borderRadius: "10px",
    "& .cm-theme": {
      minHeight: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "6px",
    },
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
interface Props {
  close: () => void;
  html: string;
  onSave: (savingHtml: string) => void;
}
export default function CodeMirrorDialog({
  close,
  html: inHtml,
  onSave,
}: Props) {
  const [initialHtml, setInitialHtml] = useState(inHtml);
  React.useEffect(() => {
    setInitialHtml(beautifyHtml(initialHtml));
  }, [initialHtml]);
  const htmlRef = React.useRef(initialHtml);
  const handleClose = (event: any, reason: string | null | undefined) => {
    if (reason && reason == "backdropClick") {
      return;
    } else {
      close();
    }
  };
  return (
    <BootstrapDialog
      aria-labelledby="Редактор кода Codemirror"
      open={true}
      onClose={handleClose}
    >
      <BootstrapDialogTitle
        id={"article_codemirror_editor_modal"}
        onClose={close}
      >
        Редактор кода Codemirror
      </BootstrapDialogTitle>
      <DialogContent>
        <CodeMirrorEditor initialHtml={initialHtml} htmlRef={htmlRef} />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            close();
          }}
          sx={{
            background: grey[300],
            color: "black",
            "&:hover": {
              background: grey[400],
              color: "black",
              boxShadow: "none",
            },
          }}
        >
          Отменить
        </Button>
        <Button
          autoFocus
          onClick={() => {
            onSave(htmlRef.current);
            close();
          }}
        >
          Сохранить
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

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

const StyledCodeDialog = styled(Dialog)(({ theme }) => ({
  "& .DialogContent-root": {
    padding: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0,
  },
  "& .DialogActions-root": {
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    "& button": {
      borderRadius: "8px",
      padding: "6px 25px",
      fontSize: "15px",
      lineHeight: "18px",
      fontWeight: 500,
    },
  },
  "& .Dialog-container > div:first-of-type.Paper-root": {
    height: "100%",
    minHeight: "100vh",
    width: "1280px",
    maxWidth: "100%",
    margin: 0,
    borderRadius: 0,
    // overflowX: "hidden",
    "& .cm-theme": {
      minHeight: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "6px",
      "& .cm-editor": {
        fontFamily: "monospace",
        fontSize: "15px",
        lineHeight: "18px",
      },
    },
  },
}));

export interface DialogTitleProps
  extends React.ComponentProps<typeof DialogTitle> {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CodeDialogTitle(props: DialogTitleProps) {
  const { children, onClose, sx, ...other } = props;
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 1,
        pt: 0,
        pl: 1.1,
        fontSize: "16px",
        lineHeight: "23px",
        height: "24px",
        ...sx,
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            p: "2px",
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "white",
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
  const htmlRef = React.useRef(initialHtml);
  React.useEffect(() => setInitialHtml(beautifyHtml(htmlRef.current)), []);
  const handleClose = React.useCallback(
    (event: any, reason: string | null | undefined) => {
      if (reason === "backdropClick") {
        onSave(htmlRef.current);
        close();
      } else {
        onSave(htmlRef.current);
        close();
      }
    },
    [onSave, close]
  );
  return (
    <StyledCodeDialog
      aria-labelledby="Редактор кода Codemirror"
      open={true}
      onClose={handleClose}
    >
      <CodeDialogTitle id={"article_codemirror_editor_modal"} onClose={close}>
        Редактор кода Codemirror
      </CodeDialogTitle>
      <DialogContent>
        <CodeMirrorEditor
          onChange={onSave}
          initialHtml={initialHtml}
          htmlRef={htmlRef}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            onSave(initialHtml);
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
    </StyledCodeDialog>
  );
}

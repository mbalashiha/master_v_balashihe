import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { styled, Paper } from "@mui/material";

type PaperProps = React.ComponentProps<typeof Paper>;
type StyledPaperProps = {
  ellipsis?: boolean;
};
type Props = PaperProps & StyledPaperProps;

export const StyledPaper = styled(({ ellipsis: _, ...props }: Props) => (
  <Paper {...props} />
))<StyledPaperProps>(({ theme, ellipsis }) => ({
  ...standartCssTransition,
  background: "none",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  minWidth: "0px",
  overflowWrap: "break-word",
  backgroundClip: "border-box",
  border: "none",
  borderRadius: "0.75rem",
  boxShadow: "none",
  overflow: "visible",
  "& ul": {
    padding: 0,
  },
  "& li": {
    padding: 0,
    borderRadius: "0.6rem",
    overflow: "hidden",
    "&.MuiDivider-root": {
      marginLeft: "5px",
      marginRight: "5px",
      maxHeight: "1px",
    },
    "& .MuiListItemText-root": {
      maxHeight: "54px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: theme.palette.articleText.main,
      paddingLeft: "8px",
    },
    "& .MuiListItemIcon-root": {
      height: "76px",
      width: "76px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      position: "relative",
      "&.active": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      "& img": {
        borderRadius: "0.6rem",
      },
    },
    "&, & a, & div, & div span": {
      borderRadius: "0.6rem",
      fontWeight: 600,
      fontSize: "11pt",
      lineHeight: "18px",
    },
    "& div span": {
      display: ellipsis && "block",
      overflow: ellipsis && "hidden",
      whiteSpace: ellipsis && "nowrap",
      textOverflow: ellipsis && "ellipsis",
    },
    "& > *, & > .MuiButtonBase-root": {
      padding: 0,
      paddingLeft: 0,
      height: "76px",
      overflow: "hidden",
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: "28px",
  },
  "& .MuiListItemButton-root": {
    paddingLeft: "4px",
  },
}));

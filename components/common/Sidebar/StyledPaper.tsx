import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { styled, Paper } from "@mui/material";

type PaperProps = React.ComponentProps<typeof Paper>;
type StyledPaperProps = {
  ellipsis?: boolean;
}
type Props = PaperProps & StyledPaperProps;

export const StyledPaper = styled(({ ellipsis: _, ...props }: Props) => (
  <Paper {...props} />
))<StyledPaperProps>(({ theme, ellipsis }) => ({
  color: "#000000de",
  ...standartCssTransition,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  minWidth: "0px",
  overflowWrap: "break-word",
  backgroundClip: "border-box",
  border: "0px solid #00000020",
  borderRadius: "0.75rem",
  boxShadow:
    "#0000001a 0rem 0.25rem 0.375rem -0.0625rem, #0000000f 0rem 0.125rem 0.25rem -0.0625rem",
  overflow: "visible",
  "& li": {
    padding: 0,
    "&, & a, & div": {
      borderRadius: "0.6rem",
      fontWeight: 500,
    },
    "& div span": {
      color: "black",
      fontWeight: 500,
      display: ellipsis && "block",
      overflow: ellipsis && "hidden",
      whiteSpace: ellipsis && "nowrap",
      textOverflow: ellipsis && "ellipsis",
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: "28px",
  },
  "& .MuiListItemButton-root": {
    paddingLeft: "4px",
  },
}));

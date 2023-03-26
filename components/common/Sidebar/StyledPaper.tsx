import { styled, Paper } from "@mui/material";

type StyledPaperProps = {
  ellipsis?: boolean;
}
export const StyledPaper = styled(Paper)<StyledPaperProps>(({ theme, ellipsis }) => ({
  color: "#000000de",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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

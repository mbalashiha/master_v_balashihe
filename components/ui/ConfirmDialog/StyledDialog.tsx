import { styled, Dialog as MuiDialog } from "@mui/material";

export const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .Dialog-paperScrollPaper": {
    overflowX: "hidden",
  },
  "& .Dialog-paper, & .Dialog-paperScrollPaper": {
    backgroundColor: "white",
    margin: 0,
    width: "99.5vw",
    [theme.breakpoints.down("sm")]: {
      minHeight: "50vh",
    },
    [theme.breakpoints.up("sm")]: {
      minHeight: "21vh",
    },
    [theme.breakpoints.up("md")]: { width: "90vw" },
    [theme.breakpoints.up("lg")]: { width: "70vw" },
    "& .Typography-root": {
      color: "black",
      textOverflow: "ellipsis",
      maxWidth: "90%",
      overflowX: "hidden",
      wordWrap: "break-word",
    },
  },
}));

export default StyledDialog;

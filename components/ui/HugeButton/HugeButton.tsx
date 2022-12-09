import { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { styled, Button } from "@mui/material";
const HugeButton = styled(Button)(({ theme }) => ({
  "&&": {
    width: "100%",
    background: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: "white",
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: "0.95rem",
    height: "auto",
    textTransform: "none",
    textDecoration: "none",
    padding: "15px 30px",
    border: "1px solid",
    borderRadius: "5px",
    "&:hover": {
      background: "transparent",
      borderColor: theme.palette.primary.dark,
      color: theme.palette.primary.dark,
    },
  },
}));
export default HugeButton;
import {
  default as React,
  ComponentProps,
  ButtonHTMLAttributes,
  FC,
  ReactNode,
} from "react";
import {
  Button as MuiButton,
  IconButton,
  styled,
  SvgIcon,
} from "@mui/material";
import Link from "next/link";
import cn from "classnames";

const BaseButton = styled(MuiButton)(({ theme }) => ({
  "&&": {
    background: theme.palette.secondary.light,
    "&:hover": {
      background: theme.palette.primary.light,
    },
    fontFamily: theme.typography.button.fontFamily,
    fontWeight: 700,
    color: theme.palette.mode === "dark" ? "white" : "black",
    padding: "0.1rem 1.2rem",
    paddingTop: "0.35rem",
    fontSize: "0.8rem",
    lineHeight: "0.8rem",
    "& .MuiSvgIcon-root": {
      fontSize: "1.8rem",
    },
    "& .MuiButton-endIcon, & .MuiButton-startIcon": {
      padding: 0,
      paddingBottom: "0.3rem",
      marginLeft: "0.2rem",
    },
  },
}));
export default BaseButton;

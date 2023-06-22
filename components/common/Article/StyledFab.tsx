import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Fab,
  styled,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

export const StyledFab = styled(Fab)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.mode === "light" ? "black" : "white",
  "&:hover": {
    color: theme.palette.mode === "light" ? "white" : "black",
    background: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    boxShadow: "none",
  },
  boxShadow: "none",
  border: "2px solid rgb(235, 235, 234)",
}));

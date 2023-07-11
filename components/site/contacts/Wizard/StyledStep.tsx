import {
  Box,
  styled,
  Typography,
  Container,
  Grid,
  Card,
  Paper,
  Stack,
  SxProps,
} from "@mui/material";
import React from "react";

const StyledStep = styled(Box)(({ theme }) => ({
  "&, & > p, & > *": {
    fontWeight: 500,
    color: `#24263F`,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "auto",
    minHeight: "auto",
  },
  [theme.breakpoints.up("xl")]: {
    minWidth: "900px",
    minHeight: "500px",
  },
}));
interface Props {
  children?: React.ReactNode | React.ReactNode[];
  title: string;
}
export default function Step({ title, children }: Props) {
  return (
    <StyledStep>
      <Typography sx={{ fontSize: "21px", py: 1 }}>{title}</Typography>
    </StyledStep>
  );
}

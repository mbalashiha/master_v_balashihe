import { styled, Box } from "@mui/material";

export const PaperBox = styled(Box)(({ theme }) => ({
  padding: 0,
  opacity: "1",
  background: "transparent",
  color: theme.palette.articleText.main,
  boxShadow: "none",
}));

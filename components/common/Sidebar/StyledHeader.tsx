import { styled, Box } from "@mui/material";

export const StyledHeader = styled(Box)(({ theme }) => ({
  textAlign: "left",
  width: "100%",
  marginBottom: "5px",
  padding: "0 1.65rem",
  fontSize: "24px",
  lineHeight: "36px",
  fontWeight: 700,
  background: "none",
  borderRadius: 0,
  borderBottom: "1px solid grey",
}));

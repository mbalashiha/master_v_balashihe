import { styled, Box } from "@mui/material";

export const StyledHeader = styled(Box)(({ theme }) => ({
  textAlign: "left",
  width: "100%",
  padding: "0 0 1px 0",
  fontSize: "22px",
  lineHeight: "36px",
  fontWeight: 400,
  background: "none",
  borderRadius: 0,
  borderBottom: "1px solid #cecece",
  borderColor: "#cecece",
}));

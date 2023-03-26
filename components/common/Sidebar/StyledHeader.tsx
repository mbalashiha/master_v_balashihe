import { styled, Box } from "@mui/material";

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "-40px",
  opacity: "1",
  background: `linear-gradient(187deg, #d81b60, ${theme.palette.primary.main})`,
  borderRadius: "0.75rem",
  padding: "1rem 1.5rem",
  boxShadow:
    "#00000024 0rem 0.25rem 1.25rem 0rem, #e91e6266 0rem 0.4375rem 0.625rem -0.3125rem",
  color: "white",
  fontSize: "22px",
  lineHeight: "22px",
  fontWeight: 700,
}));

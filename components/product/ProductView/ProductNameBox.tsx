import { Button, IconButton, Box, styled, Typography } from "@components/ui";
const NameBox = styled("div")(({ theme }) => ({
  marginBottom: "1rem",
  "& .name, & .price": {
    color: theme.palette.text.primary,
  },
  "& .name": {
    fontSize: "1.6rem",
    letterSpacing: "0.4px",
  },
}));
export default NameBox;

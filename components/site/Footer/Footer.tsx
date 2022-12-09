import Link from "next/link";
import PaletterModeSwitch from "@components/common/paletter/PaletteSwitch";
import { Container, Box } from "@mui/material";
export const Footer = () => {
  return (
    <Container
      maxWidth={false}
      component={"footer"}
      sx={{
        background: "black",
        position: "absolute",
        minHeight: "20rem",
        height: "20rem",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& a": {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      }}
    >
      <Box>
        <Link href="/" passHref>
          © {new Date().getFullYear()} Мастер в Балашихе
        </Link>
      </Box>
      {/* <PaletterModeSwitch sx={{ bottom: 0, right: "0.5rem" }} /> */}
    </Container>
  );
};

export default Footer;

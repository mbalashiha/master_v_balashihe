import Link from "next/link";

import { Container, Box } from "@mui/material";

export const Footer: React.FC<void> = () => {
  return (
    <>
      <Container
        component={"footer"}
        sx={{
          position: "absolute",
          minHeight: "20rem",
          height: "20rem",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          minWidth: "100%",
          background: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <p>
            <Link href="/" passHref>
              © {new Date().getFullYear()} Мастер в Балашихе
            </Link>
          </p>
        </Box>
        {/* <PaletterModeSwitch sx={{ bottom: 0, right: "0.5rem" }} /> */}
      </Container>
    </>
  );
};

export default Footer;

import Link from "next/link";
import PaletterModeSwitch from "@components/common/paletter/PaletteSwitch";
import { Container, Box } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
export const Footer = () => {
  return (
    <Container
      maxWidth={false}
      component={"footer"}
      sx={{
        background: "black",
        color: "white",
        position: "absolute",
        minHeight: "20rem",
        height: "20rem",
        fontSize: "16px",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& *": {
          textAlign: "center",
        },
        "& p": {
          margin: "4px",
        },
        "& a": {
          fontSize: "18px",
          textDecoration: "none",
          color: (theme) => theme.palette.primary.main,
          "&:hover": {
            textDecoration: "none",
          },
        },
      }}
    >
      <div>
        <Box
          sx={{
            border: `2px solid ${grey[800]}`,
            padding: "10px",
            marginTop: "8px",
            borderRadius: "8px",
          }}
        >
          <p>
            <Link href="/">© {new Date().getFullYear()} Мастер в Балашихе</Link>
          </p>
          <p>143912, Балашиха центр города, Шоссе Энтузиастов М-7</p>
        </Box>
        <Box
          sx={{
            color: grey[400],
            border: `2px solid ${grey[800]}`,
            padding: "10px",
            marginTop: "8px",
            borderRadius: "8px",
          }}
        >
          <p>
            Вызвать мастера в Балашихе для ремонта компьютера или ноутбука на
            дом или в офис
          </p>
          <p>Время работы: с 9:00 до 24:00 | Без выходных</p>
        </Box>
      </div>
      {/* <PaletterModeSwitch sx={{ bottom: 0, right: "0.5rem" }} /> */}
    </Container>
  );
};

export default Footer;

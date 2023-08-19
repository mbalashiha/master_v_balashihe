import Link from "next/link";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { Container, Box, IconButton } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import GetDiscountButton from "./GetDiscountButton";
export const Footer = () => {
  return (
    <Container
      maxWidth={false}
      component={"footer"}
      sx={{
        backgroundColor: "black",
        backgroundImage: "url(/mir-logo.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: "center", sm: "4px -96px" },
        backgroundSize: { xs: "fit", sm: "650px auto" },
        color: "white",
        position: "absolute",
        minHeight: "26rem",
        height: "26rem",
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
        "& > div > div": {
          background: "rgba(28,31,33,50%)",
          border: `2px solid ${grey[800]}`,
          padding: "10px",
          borderRadius: "8px",
        },
      }}
    >
      <div>
        <Box sx={{}}>
          <p>
            <Link href="/">© {new Date().getFullYear()} Мастер в Балашихе</Link>
          </p>
          <p>143912, Балашиха центр города, Шоссе Энтузиастов М-7</p>
        </Box>
        <Box
          sx={{
            color: grey[400],
            marginTop: "8px",
          }}
        >
          <p>
            Вызвать мастера в Балашихе для ремонта компьютера или ноутбука на
            дом или в офис
          </p>
          <p>Время работы: с 9:00 до 24:00 | Без выходных</p>
        </Box>
      </div>
      <IconButton
        sx={{
          zIndex: 1,
          color: "grey.200",
          position: "absolute",
          right: { xs: "5px", lg: "10px" },
          bottom: { xs: "5px", md: "50%" },
          transform: { xs: "inherit", md: "translate(0, 60%)" },
          background: "rgba(28,31,33,50%)",
          "&:hover": {
            background: "rgb(28,31,33)",
          },
          "& svg": {
            width: "60px",
            height: "60px",
          },
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <KeyboardDoubleArrowUpRoundedIcon />
      </IconButton>
      <GetDiscountButton />
    </Container>
  );
};

export default Footer;

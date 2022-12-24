import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const LastHeaderBeforeContacts = () => {
  return (
    <Container maxWidth={"lg"} sx={{ pt: "100px" }}>
      <Typography
        component="h3"
        variant="h1"
        gutterBottom
        mb={0}
        pb={0}
        color={(theme) => theme.palette.text.primary}
      >
        <Box component="span" color="primary.main">
          Готовы заказать{" "}
        </Box>
        <br /> ремонт компьютера{" "}
        <Box component="span" color="primary.main">
          в Балашихе
        </Box>
        ?
      </Typography>
    </Container>
  );
};

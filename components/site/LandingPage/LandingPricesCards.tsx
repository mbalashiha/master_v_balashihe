import { Layout } from "@components/site";
import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PriceIcon1 } from "@components/icons/Landing/PriceIcon1";
import { PriceIcon2 } from "@components/icons/Landing/PriceIcon2";
import { PriceIcon3 } from "@components/icons/Landing/PriceIcon3";
import { GradientCard } from "components/ui/GradientCard";

export const LandingPricesCards = () => {
  return (
    <Container maxWidth={"lg"} sx={{ pt: "100px" }}>
      <Typography component="h3" variant="h1" gutterBottom mb="2rem">
        <Box component="span" color="primary.main">
          Оживлю любой компьютер
        </Box>{" "}
        и настрою <br /> лицензионное программное обеспечение
      </Typography>
      <Grid container sx={{ mt: 0 }} spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <GradientCard
            key={"1"}
            title={"Настройка компьютера"}
            titleIcon={<PriceIcon1 />}
          >
            <></>
          </GradientCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GradientCard
            key={"2"}
            title={"Модернизация"}
            titleIcon={<PriceIcon2 />}
          >
            <></>
          </GradientCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GradientCard
            key={"3"}
            title={"Ремонт устройства"}
            titleIcon={<PriceIcon3 />}
          >
            <></>
          </GradientCard>
        </Grid>
      </Grid>
    </Container>
  );
};
export default LandingPricesCards;

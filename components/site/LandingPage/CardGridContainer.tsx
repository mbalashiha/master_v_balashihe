import { Layout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandingCard from "@components/shared/LandingCard";

export const CardGridContainer = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: "200px" }}>
      <Typography component="h1" variant="h1">
        <Box component="span" color="primary.main">
          Ремонтирую
        </Box>{" "}
        технику для дома, офиса и бизнеса
      </Typography>
      <Grid container sx={{ mt: 0 }} spacing={3}>
        <LandingCard
          image={
            <Image
              alt=""
              quality={100}
              src="/images/landing-banner-background-1.webp"
              width={1477}
              height={240}
              loading="lazy"
            />
          }
        >
          <Typography variant="h6">Системные блоки</Typography>
          <ul>
            <li>Игровые</li>
            <li>Для бизнеса</li>
            <li>Домашние</li>
          </ul>
        </LandingCard>
        <LandingCard
          image={
            <Image
              alt=""
              quality={100}
              src="/images/landing-banner-background-2.webp"
              width={1477}
              height={240}
              loading="lazy"
            />
          }
        >
          <Typography variant="h6">Моноблоки</Typography>
          <ul>
            <li>Для дома</li>
            <li>Для работы</li>
            <li>Для учёбы</li>
          </ul>
        </LandingCard>
        <LandingCard
          image={
            <Image
              alt=""
              quality={100}
              src="/images/landing-banner-background-3.webp"
              width={1477}
              height={240}
              loading="lazy"
            />
          }
        >
          <Typography variant="h6">Ноутбуки</Typography>
          <ul>
            <li>Игровые</li>
            <li>Офисные</li>
            <li>Домашние</li>
          </ul>
        </LandingCard>
      </Grid>
    </Container>
  );
};
export default CardGridContainer;
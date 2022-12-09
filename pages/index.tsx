import { Layout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandingCard from "@components/shared/LandingCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе - Закажите ремонт компьютера сегодня</title>
        <meta
          name="description"
          content="Мастер в Балашихе - Закажите ремонт компьютера сегодня"
        />
      </Head>
      <Container maxWidth="lg" sx={{ pt: "200px" }}>
        <Typography component="h1" variant="h1" gutterBottom>
          <Box component="span" color="primary.main">
            Ремонтирую
          </Box>{" "}
          технику для дома, офиса и бизнеса
        </Typography>
        <Grid container sx={{ mt: "1.5rem" }} spacing={3}>
          <LandingCard
            image={
              <Image
                alt=""
                quality={100}
                src="/images/pc2.png"
                width={360}
                height={223}
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
                src="/images/pc3.png"
                width={360}
                height={223}
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
                src="/images/pc1.png"
                width={360}
                height={223}
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
        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>
      </Container>
    </>
  );
}
Home.Layout = Layout;

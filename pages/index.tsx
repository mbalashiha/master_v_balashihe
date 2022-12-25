import { Layout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandingCard from "@components/shared/LandingCard";
import CardGridContainer from "@components/site/LandingPage/CardGridContainer";
import LandingReasons from "@components/site/LandingPage/LandingReasons";
import LandingPricesCards from "@components/site/LandingPage/LandingPricesCards";

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
      <CardGridContainer />
      <LandingReasons />
      <LandingPricesCards />
    </>
  );
}
Home.Layout = Layout;

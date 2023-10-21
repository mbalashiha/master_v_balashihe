import {
  Container,
  Grid,
  Card,
  Paper,
  Button,
  Stack,
  Box,
} from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import DarkContainer from "./DarkContainer";
import LandingCard from "./LandingCard";

export default function LandingServices() {
  return (
    <DarkContainer
      sx={{
        pt: { xs: "55px", lg: 0 },
      }}
    >
      <Typography
        variant="h1"
        component={"h2"}
        sx={{
          textAlign: "center",
          fontSize: "38px",
          lingHeight: "50px",
          fontWeight: 500,
          textTransform: "uppercase",
          color: "white",
          mb: { xs: "15px", lg: "65px" },
        }}
      >
        Услуги компьютерного мастера
      </Typography>
      <Grid container spacing={{ xs: "15px", lg: "35px" }}>
        <LandingCard
          header="Ремонт компьютеров"
          imageUrl="/images/services_001.webp"
        >
          Услуги по ремонту компьютерной техники в Балашихинском районе и
          Москве.
        </LandingCard>
        <LandingCard
          header="Настройка Интернета"
          imageUrl="/images/services_002.webp"
        >
          Настройка домашнего или офисного Интернета. Настройка Wi-Fi роутера:
          настройка диапазонов 2.4Ghz и 5Ghz. Проводка кабелей Ethernet (витая
          пара).
        </LandingCard>
        <LandingCard
          header="Компьютерная помощь"
          imageUrl="/images/services_003.webp"
        >
          Устрановка и настройка программ Windows, Linux и Android.
        </LandingCard>
        <LandingCard
          header="Обслуживание цифровой техники"
          imageUrl="/images/services_004.webp"
        >
          Настройка, замена расходных материалов, устранение неполадок.
        </LandingCard>
      </Grid>
    </DarkContainer>
  );
}

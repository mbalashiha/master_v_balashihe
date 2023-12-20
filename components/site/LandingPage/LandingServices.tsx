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
          textTransform: "uppercase",
          color: "white",
          mb: { xs: "15px", sm: "35px", md: "40px" },
          fontWeight: 500,
        }}
      >
        Услуги компьютерного мастера
      </Typography>
      <Grid container spacing={{ xs: "15px", lg: "25px" }}>
        <LandingCard
          header="Ремонт компьютеров"
          imageUrl="/images/services/services_001.jpg"
        >
          Услуги по ремонту компьютерной техники в Балашихинском районе и Москве
        </LandingCard>
        <LandingCard
          header="Настройка Интернета"
          imageUrl="/images/services/services_002.jpg"
        >
          Настройка домашнего или офисного Интернета. Настройка Wi-Fi роутера:
          настройка диапазонов 2.4Ghz и 5Ghz. Проводка кабелей Ethernet (витая
          пара)
        </LandingCard>
        <LandingCard
          header="Компьютерная помощь"
          imageUrl="/images/services/services_003.jpg"
        >
          Устрановка и настройка программ Windows, Linux и Android
        </LandingCard>
        <LandingCard
          header="Обслуживание цифровой техники"
          imageUrl="/images/services/services_004.jpg"
        >
          Настройка, замена расходных материалов, устранение неполадок
        </LandingCard>
      </Grid>
    </DarkContainer>
  );
}

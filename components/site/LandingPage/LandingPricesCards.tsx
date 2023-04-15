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
import PriceRow from "./PriceRow";
import Link from "next/link";

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
            <PriceRow
              href="/uslugi-mastera-v-balashihe/ustanovka-windows"
              title={"Установка Windows"}
              amount={470}
            />
            <PriceRow title={"Установка другой ОС"} amount={740} />
            <PriceRow title={"Установка программ"} amount={330} />
            <PriceRow title={"Чистка компьютера"} amount={700} />
            <PriceRow title={"Удаление вирусов"} amount={470} />
            <PriceRow title={"Настройка Wi-Fi"} amount={300} />
            <PriceRow title={"Восстановление Windows"} amount={470} />
            <PriceRow title={"Сброс BIOS"} amount={200} />
            <PriceRow title={"Аппаратный сброс пароля BIOS"} amount={1170} />
            <PriceRow title={"Сброс пароля Windows"} amount={200} />
            <PriceRow title={"Настройка Windows"} amount={700} />
          </GradientCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GradientCard
            key={"2"}
            title={"Модернизация"}
            titleIcon={<PriceIcon2 />}
            gradientNumber={2}
          >
            <PriceRow title={"Замена HDD или SSD"} amount={900} />
            <PriceRow title={"Настройка RAID массива"} amount={900} />
            <PriceRow title={"Замена ОЗУ"} amount={400} />
            <PriceRow title={"Замена процессора"} amount={730} />
            <PriceRow title={"Замена чипов мат платы"} amount={2000} />
            <PriceRow title={"Замена шлейфа матрицы"} amount={400} />
            <PriceRow title={"Замена видеокарты"} amount={800} />
            <PriceRow title={"Замена кулера"} amount={1070} />
            <PriceRow title={"Замена разъёмов"} amount={1900} />
            <PriceRow title={"Замена матрицы экрана в Балашихе"} amount={1700} />
            <PriceRow title={"Замена батарейки BIOS"} amount={200} />
          </GradientCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GradientCard
            key={"3"}
            title={"Ремонт устройства"}
            titleIcon={<PriceIcon3 />}
            gradientNumber={3}
          >
            <PriceRow
              href={`/uslugi-mastera-v-balashihe/remont-kompyuterov-s-horoshymi-otzyvami`}
              title={"Ремонт с хорошими отзывами"}
              amount={900}
            />
            <PriceRow title={"Ремонт мат платы"} amount={900} />
            <PriceRow title={"Пайка элементов мат платы"} amount={1900} />
            <PriceRow title={"Ремонт цепи питания"} amount={700} />
            <PriceRow title={"Ремонт корпуса"} amount={400} />
            <PriceRow title={"Ремонт системы охлаждения"} amount={730} />
            <PriceRow title={"Ремонт клавиатуры"} amount={400} />
          </GradientCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GradientCard
            key={"3"}
            title={"Балашиха"}
            titleIcon={<PriceIcon3 />}
            gradientNumber={4}
          >
            <PriceRow
              href={`/uslugi-mastera-v-balashihe/remont-kompyuterov-s-horoshymi-otzyvami`}
              title={"Ремонт в Балашихе с хорошими отзывами"}
              amount={900}
            />
            <PriceRow
              href="/uslugi-mastera-v-balashihe/ustanovka-windows"
              title={"Установка Windows в Балашихе"}
              amount={470}
            />
            <PriceRow title={"Компьютерная помощь в Балашихе"} />
            <PriceRow title={"Балашиха бесплатная диагностика"} />
            <PriceRow title={"Ремонт рядом с Шоссе Энтузиастов"} />
            <PriceRow title={"Ремонт ноутбуков недорого в Балашихе"} />
            <PriceRow title={"Диагностика техники в центре Балашихи"} />
          </GradientCard>
        </Grid>
      </Grid>
    </Container>
  );
};
export default LandingPricesCards;

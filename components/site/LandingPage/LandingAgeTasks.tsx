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
import ClientStep from "./ClientStep";
import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import { EnhImage } from "@components/ui";
import TaskCard from "./TaskCard";
import { useSiteModal } from "@components/site/ModalProvider/ModalProvider";

export default function LandingAgeTasks() {
  const { toggleModal } = useSiteModal();
  return (
    <DarkContainer sx={{ pt: 0 }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component={"h2"}
          sx={{
            textAlign: "center",
            fontSize: "38px",
            lingHeight: "50px",
            fontWeight: 500,
            textTransform: "none",
            color: "white",
            mb: { xs: "15px", lg: "35px" },
          }}
        >
          За множество лет я сталкивался с разными IT задачами
        </Typography>
      </Container>
      <Grid container spacing={{ xs: "45px", md: "55px" }}>
        <TaskCard
          timeAmount="1-2 часа"
          title="Сборка компьютера, замена процессора и других комплектующих"
          image={
            <Image
              src="/images/landing/portfolio004.jpg"
              width={1518}
              height={900}
              alt=""
            />
          }
        >
          Замена процессора и/или материнской платы на новые с подбором блока
          питания необходимой мощности. Предполагает полную разборку системного
          блока или ноутбука с последующим нанесением свежей термопасты.
        </TaskCard>
        <TaskCard
          timeAmount="30-60 минут"
          title="Замена термопасты"
          image={
            <Image
              src="/images/landing/portfolio002.webp"
              width={1200}
              height={774}
              alt=""
            />
          }
        >
          Сборка и разборка системного блока или ноутбука, очистка от пыли,
          удаление грязи на контактах с помощью спирта, смазка подвижных
          элементов силиконовой смазкой, замена старой термопасты и
          термопрокладок под радиаторами.
        </TaskCard>
        <TaskCard
          timeAmount="более 1 часа"
          title="Замена жесткого диска на твердотельный накопитель SSD"
          image={
            <Image
              src="/images/landing/portfolio003.webp"
              width={1518}
              height={900}
              alt=""
            />
          }
        >
          Предварительная разбортка корпуса моноблока, ноутбука или ПК, очистка
          от пыли и грязи, замена HDD на SSD, апгрейд ОС или установка чистой
          Windows, Linux или Mac OS.
        </TaskCard>
        <TaskCard
          timeAmount="около получаса"
          title="Очистка от пыли и жирных пятен"
          image={
            <Image
              src="/images/landing/portfolio001.webp"
              width={1518}
              height={900}
              alt=""
            />
          }
        >
          Разборка корпуса системного блока или ноутбука, очистка с помощью
          кисточки и изопропилового спирта.
        </TaskCard>
      </Grid>
      <Box
        sx={{
          mt: 0,
          mb: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Button
          sx={{
            mt: "40px",
            position: "relative",
            minWidth: "274px",
            minHeight: "60px",
            maxWidth: "98vw",
            py: "8px",
            px: "30px",
            background: (theme) => theme.palette.primary.light,
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            "&&": {
              color: "black",
              "&:hover": {
                background: (theme) => theme.palette.primary.main,
                color: "white",
              },
            },
          }}
          onClick={() => toggleModal("contact request form")}
        >
          Оставить заявку
        </Button>
      </Box>
    </DarkContainer>
  );
}

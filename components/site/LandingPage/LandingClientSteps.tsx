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
import { useSiteModal } from "@components/site/contacts/ModalProvider";

export default function LandingClientSteps() {
  const { openContactRequest } = useSiteModal();
  return (
    <DarkContainer
      sx={{ zIndex: 2, pb: "90px" }}
      background={
        <>
          <Box
            sx={{
              backgroundPosition: "center center",
              backgroundAttachment: "scroll",
              backgroundImage: `url(/images/circuit.webp)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              border: "1px solid #010101",
            }}
          ></Box>
          <Box
            sx={{
              backgroundImage: `linear-gradient(to bottom, rgba(1,1,1,1) 0px, rgba(1, 1, 1, 0.9) 15px, rgba(1, 1, 9, 0.85) 80px, rgba(1,1,1,1))`,
              height: "100%",
              width: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              border: "1px solid #010101",
            }}
          ></Box>
        </>
      }
    >
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
        Как я{" "}
        <Box
          component={"span"}
          sx={{
            px: "7px",
            pt: "2px",
            pb: "7px",
            background: (theme) => `${theme.palette.primary.main}80`,
            borderRadius: "6px",
          }}
        >
          работаю
        </Box>{" "}
        с клиентами
      </Typography>
      <Grid container spacing={{ xs: "15px", lg: "35px" }}>
        <ClientStep title="Заявка" imageUrl="/icons/client/step001.png">
          Вы можете заказать обратный звонок или позвонить по номеру <br />
          <Box
            component="b"
            sx={{ textDecoration: "underline", fontWeight: 500 }}
          >
            {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
          </Box>
        </ClientStep>
        <ClientStep title="Консультация" imageUrl="/icons/client/step002.png">
          Определяем причину проблемы и оговариваем условия визита
        </ClientStep>
        <ClientStep title="Работа" imageUrl="/icons/client/step003.png">
          Я выезжаю к вам на дом или в офис в пределах Балашихи к указанному
          времени
        </ClientStep>
        <ClientStep title="Оплата" imageUrl="/icons/client/step004.png">
          После завершения ремонта и вашей проверки вы оплачиваете услуги
        </ClientStep>
      </Grid>
      <Box
        sx={{
          mt: "60px",
          mb: 0,
          width: "100%",
          textAlign: { xs: "left", md: "center" },
          overflow: "visible",
        }}
      >
        <Button
          sx={{
            position: "relative",
            overflow: "visible",
            width: "500px",
            maxWidth: "70vw",
            py: "14px",
            px: { xs: "6px", md: "40px" },
            background: (theme) => theme.palette.primary.light,
            border: "none",
            borderRadius: "6px",
            m: 0,
            fontSize: "22px",
            lineHeight: "31px",
            "&, && > *": {
              color: "black",
            },
            "&:hover": {
              background: (theme) => theme.palette.primary.main,
              "&, && > *": {
                color: "white",
              },
            },
          }}
          onClick={openContactRequest}
        >
          <span>Вызвать мастера</span>
          <Box
            sx={{
              zIndex: -1,
              position: "absolute",
              bottom: "-90px",
              right: "-105px",
              // transform: "translate(90%, 72%)",
            }}
          >
            <EnhImage
              src="/images/landing/mouse.png"
              width={256}
              height={228}
              fitWidth={115}
              alt=""
            />
          </Box>
        </Button>
      </Box>
    </DarkContainer>
  );
}

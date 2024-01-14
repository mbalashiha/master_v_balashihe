import { FC } from "react";
import React from "react";
import s from "@components/site/Footer/DiscountButton.module.scss";
import DiscountIcon from "@public/icons/badge-discount.svg";
import {
  Grid,
  ThemeProvider,
  Container,
  Box,
  Stack,
  Button,
  Portal,
} from "@mui/material";
import { useSiteModal } from "@components/site/ModalProvider";

export default function GetDiscountButton() {
  const { toggleModal } = useSiteModal();
  return (
    <Container
      maxWidth="xl"
      sx={{
        zIndex: 2,
        position: "absolute",
        bottom: 0,
        left: "0",
        right: "0",
        margin: "auto",
        height: 0,
        overflow: "visible",
        backfaceVisibility: "hidden",
      }}
    >
      <Button
        startIcon={<DiscountIcon />}
        onClick={() => toggleModal("get discount wizard")}
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          zIndex: 2,
          position: "absolute",
          bottom: 0,
          left: "8px",
          border: "none",
          color: "white",
          background: (theme) => theme.palette.primary.main,
          pl: "14px",
          pt: "14px",
          pb: "10px",
          borderRadius: "20px 20px 0 0",
          "& svg": {
            width: "40px",
            height: "40px",
            mr: "2px",
          },
          boxShadow: `0px 0px 8px 8px rgba(255,255,255,0.06), 0px 0px 2px 1px rgba(255,255,255,0.1), 0px 0px 6px 4px rgba(255,255,255,0.12)`,
        }}
        className={s.button}
      >
        Получить скидку
        <span className={s.buttonFlare}></span>
      </Button>
    </Container>
  );
}

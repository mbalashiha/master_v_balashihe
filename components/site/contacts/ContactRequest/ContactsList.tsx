import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider, Button } from "@mui/material";
import ColBox from "./ColBox";
import PhoneRow from "../Wizard/ModalContacts/PhoneRow";
import EmailRow from "../Wizard/ModalContacts/EmailRow";
import WhatsappRow from "../Wizard/ModalContacts/WhatsappRow";
import TelegramRow from "../Wizard/ModalContacts/TelegramRow";
import { useSiteModal } from "@components/site/ModalProvider/ModalProvider";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

export default function ContactsList() {
  const { toggleModal } = useSiteModal();
  return (
    <ColBox alignItems={"flex-start"} sx={{ pt: "10px"}}>
      <PhoneRow />
      <EmailRow />
      <TelegramRow />
      <WhatsappRow />
      <Button
        sx={{
          width: "100%",
          "& svg": { width: "40px", height: "40px", mr: "10px" },
        }}
        onClick={() => toggleModal("contact request form")}
        startIcon={<PhoneInTalkIcon />}
      >
        Заказать обратный звонок
      </Button>
    </ColBox>
  );
}

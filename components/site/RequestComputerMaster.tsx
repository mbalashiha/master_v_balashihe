import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Paper,
} from "@mui/material";
import React from "react";
import { useSiteModal } from "./ModalProvider";
import { Link as MuiLink } from "@mui/material";

type Props = React.ComponentProps<typeof Card>;
export default function RequestComputerMaster({ sx, ...rest }: Props) {
  const { toggleModal } = useSiteModal();
  return (
    <Card
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        transform: "translateY(50%)",
        "& strong": {
          color: (theme) => theme.palette.primary.main,
        },
        ...sx,
      }}
      {...rest}
    >
      <CardHeader
        title={`Хотите проконсультироваться со специалистом?`}
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
          px: "30px",
        }}
      ></CardHeader>
      <CardContent sx={{ px: "30px", pt: 0 }}>
        <MuiLink onClick={() => toggleModal("contact list")}>
          Напишите мне в WhatsApp
        </MuiLink>
        . Расскажите о симптомах, а я назову примерную причину неполадки Вашего
        компьютера и варианты её устранения, а также мы выберем удобное время
        выезда мастера для ремонта. Работаю в Балашихе по выходным дням. Звоните
        или{" "}
        <MuiLink onClick={() => toggleModal("contact request form")}>
          оставьте заявку на выезд мастера
        </MuiLink>
        .
      </CardContent>
    </Card>
  );
}

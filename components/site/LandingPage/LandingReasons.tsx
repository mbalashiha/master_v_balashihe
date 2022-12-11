import { Layout } from "@components/site";
import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandingCard from "@components/shared/LandingCard";
import { IconOne } from "./Icons/IconOne";
import { IconTwo } from "./Icons/IconTwo";
import { IconThree } from "./Icons/IconThree";
import { IconFoo } from "./Icons/IconFoo";
import ReasonItem from "./ReasonItem";

export const LandingReasons = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: "120px" }}>
      <Typography component="h3" variant="h1" gutterBottom>
        <Box component="span" color="primary.main">
          Есть 4 причины
        </Box>{" "} обратиться ко мне отремонтировать и настроить компьютер
      </Typography>
      <Grid container sx={{ mt: "1.5rem" }} spacing={3}>
        <ReasonItem svgIcon={<IconOne />} title={<>Гарантия 60 дней</>}>
          Я несу ответственность за оказанные мною услуги и после ремонта. На
          все работы можно оформить гарантию.
        </ReasonItem>
        <ReasonItem svgIcon={<IconTwo />} title={<>Озвучиваю цену</>}>
          Сумму оплаты за ремонт электроники я сообщю Вам до его начала. Мы
          обсудим реальную необходимость такого ремонта заранее.
        </ReasonItem>
        <ReasonItem svgIcon={<IconThree />} title={<>Договор с самозанятым</>}>
          Подробности об оказываемых услугах ремонта, можно занести в письменный
          договор самозанятого с необходимыми подробностями для сервисного
          центра.
        </ReasonItem>
        <ReasonItem svgIcon={<IconFoo />} title={<>Электронный чек</>}>
          После окончания ремонта мы произведём оплату с помощью электронного чека.
          У Вас будет
          право на бесплатный вызов мастера, в случае повторного
          возникновения поломки.
        </ReasonItem>
      </Grid>
    </Container>
  );
};
export default LandingReasons;

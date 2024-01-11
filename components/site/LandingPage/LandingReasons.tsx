import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconOne } from "./Icons/IconOne";
import { IconTwo } from "./Icons/IconTwo";
import { IconThree } from "./Icons/IconThree";
import { IconFoo } from "./Icons/IconFoo";
import ReasonItem from "./ReasonItem";
import DarkContainer, { DarkContainerProps } from "./DarkContainer";

export const LandingReasons = (props: DarkContainerProps) => {
  return (
    <DarkContainer {...props}>
      <Typography
        component="h3"
        variant="h1"
        sx={{ fontWeight: 500, pb: 0, mb: "30px" }}
      >
        <Box component="span" color="primary.main">
          Несколько причин
        </Box>{" "}
        обратиться к мастеру
      </Typography>
      <Grid container spacing={3}>
        <ReasonItem svgIcon={<IconOne />} title={<>Гарантирую результат</>}>
          Вы платите только за оказанные услуги по ремонту. В Балашихе Вы
          получаете бесплатный выезд мастера и диагностику. Я несу
          ответственность за оказанные мною услуги и после ремонта.
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
          После окончания ремонта мы произведём оплату с помощью электронного
          чека. У Вас будет право на бесплатный вызов мастера, в случае
          повторного возникновения поломки.
        </ReasonItem>
      </Grid>
    </DarkContainer>
  );
};
export default LandingReasons;

import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import YandexMapIframe from "@components/site/YandexMapIframe";
import { PhoneLink } from "@components/ui";
import { blueGrey, grey } from "@mui/material/colors";

export const BottomContactsWithMap = () => {
  return (
    <>
      <Container maxWidth={"lg"} sx={{ textAlign: "center" }}>
        <Paper
          elevation={0}
          sx={{
            p: 1,
            backgroundColor: (theme) => theme.palette.secondaryBackground.main,
            border: `4px solid #EBEBEA`,
          }}
        >
          <Typography
            component="p"
            variant="h1"
            mb={0}
            pb={0}
            color={(theme) => theme.palette.text.primary}
          >
            Звоните <PhoneLink />
          </Typography>
          <Typography
            component="h2"
            variant="h1"
            mb={0}
            pb={0}
            color={(theme) => theme.palette.text.primary}
          >
            Консультация компьютерного мастера в Балашихе
          </Typography>
          <Typography
            component="p"
            variant="h1"
            mb={0}
            pb={0}
            color={(theme) => theme.palette.primary.main}
          >
            всегда бесплатна!
          </Typography>
        </Paper>
      </Container>
      <Container maxWidth={"lg"}>
        <YandexMapIframe></YandexMapIframe>
      </Container>
    </>
  );
};

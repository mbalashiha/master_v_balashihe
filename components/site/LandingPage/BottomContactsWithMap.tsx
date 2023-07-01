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
      <Container maxWidth={"lg"}>
        <YandexMapIframe></YandexMapIframe>
      </Container>
    </>
  );
};

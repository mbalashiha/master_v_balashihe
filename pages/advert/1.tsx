import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import {
  Container,
  Grid,
  Card,
  Paper,
  Box,
  Typography,
  Stack,
} from "@mui/material";
// import SiteUrlQrCode from "public/images/advert/site_url_qr_code.svg";
import Image from "next/image";
import React from "react";
const LightGreyText = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <Box color={"grey.400"} component="span">
      {children}
    </Box>
  );
};
export default function Advert1() {
  return (
    <Container
      maxWidth="md"
      sx={{
        "& h1": {
          textTransform: "uppercase",
          fontSize: "52pt",
          lineHeight: "52pt",
          whiteSpace: "nowrap",
          margin: `0 0 12pt 0`,
        },
        "& p": {
          margin: 0,
        },
      }}
    >
      <h1>
        Мастер
        <LightGreyText>-</LightGreyText>в<LightGreyText>-</LightGreyText>
        Балашихе<LightGreyText>.рф</LightGreyText>
      </h1>
      <Stack
        direction="row"
        width="100%"
        alignContent={"space-between"}
        alignItems="flex-end"
      >
        <Typography
          fontSize="40pt"
          lineHeight={"40pt"}
          variant="h2"
          color="grey.500"
          fontWeight={600}
          flexGrow={1}
        >
          Сайт
        </Typography>
        <Typography
          fontSize="38pt"
          lineHeight={"38pt"}
          variant="h2"
          color="grey.700"
          fontWeight={600}
        >
          тел.&nbsp;
        </Typography>
        <Typography
          fontSize="40pt"
          lineHeight={"40pt"}
          variant="h2"
          color="grey.800"
          fontWeight={600}
        >
          {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          sx={{
            "& img": {
              objectFit: "contain",
              width: "100%",
              height: "auto",
            },
          }}
        >
          <Image
            src="/images/advert/site_url_qr_code.svg"
            width={1600}
            height={1600}
            unoptimized
            alt=""
            loading="eager"
          />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            position: "relative",
            textAlign: "right",
            height: "440pt",
            width: "440pt",
            pt: "10pt",
            "& img": {
              position: "absolute",
              top: "10pt",
              left: 0,
              right: 0,
              height: "440pt",
              width: "440pt",
              objectFit: "contain",
            },
          }}
        >
          <Image
            src="/images/advert/grey-master-v-balashihe-rf-screwdriver.svg"
            width={600}
            height={600}
            unoptimized
            alt=""
            loading="eager"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

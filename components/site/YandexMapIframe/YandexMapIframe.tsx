import { IconEmailCircle } from "@components/icons";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ContactInfoRow from "@components/site/LandingPage/ContactInfoRow";
import { EmailLink, PhoneLink } from "@components/ui";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import IconLocationCircle from "@components/icons/IconLocationCircle";
import MapStaticPic from "/public/images/map.png";
import { email, phoneNumber, locationPlace } from "@/const/contacts";
import RenderNbsp from "./RenderNbsp";

const YandexMapIframe = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          "&&": {
            px: 0,
            paddingTop: "30px",
          },
          position: "relative",
        }}
      >
        <Container
          maxWidth={"lg"}
          sx={{
            "&&": {
              px: 0,
            },
            position: { xs: "inherit", lg: "relative" },
            display: { xs: "flex", lg: "block" },
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              zIndex: 2,
              position: { xs: "inherit", lg: "absolute" },
              top: 0,
              marginBottom: { xs: "15px", md: 0 },
              minHeight: "440px",
              width: { xs: "100%", sm: "520px", md: "420px" },
              marginLeft: { lg: "-15px", xl: "-55px" },
              marginTop: { md: "43px" },
              border: "12px solid",
              borderColor: "background.paper",
              borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: "440px",
                border: "3px solid",
                borderColor: "primary.light",
                borderRadius: (theme) => theme.shape.borderRadius - 9 + "px",
                py: "30px",
                pl: "30px",
                pr: 0,
              }}
            >
              <Stack direction={"column"} spacing={3}>
                <Typography
                  component="div"
                  variant="h1"
                  fontSize="34px"
                  lineHeight={"39px"}
                  fontWeight={700}
                >
                  Контакты
                </Typography>
                <ContactInfoRow
                  svgIcon={<IconPhoneCircle />}
                  label={"Телефон:"}
                  infoText={<PhoneLink value={phoneNumber} />}
                />
                <ContactInfoRow
                  svgIcon={<IconEmailCircle />}
                  label={"Почта:"}
                  infoText={<EmailLink email={email} />}
                />
                <ContactInfoRow
                  svgIcon={<IconLocationCircle />}
                  label={"На карте:"}
                  infoText={locationPlace}
                />
              </Stack>
            </Box>
          </Paper>
        </Container>
        <Box
          sx={{
            zIndex: 0,
            height: "555px",
            width: "100%",
            marginLeft: "auto",
            marginRight: 0,
            border: "11px solid",
            borderColor: (theme) => theme.palette.background.paper,
            borderRadius: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            position: "relative",
            overflow: "hidden",
            "& img": {
              zIndex: 0,
            },
            "& iframe": {
              zIndex: 1,
              height: "535px",
              width: "100%",
              border: "none",
              position: "absolute",
              top: 0,
              right: 0,
              left: "auto",
              bottom: "auto",
              marginLeft: "auto",
              marginRight: 0,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <iframe
            width="100%"
            height="535px"
            src="/yandex-map-iframe.html"
            loading="lazy"
            name="yandex-map-balashiha-map-iframe"
            title="Карта Мастер в Балашихе Центр города Балашиха"
            sandbox="allow-scripts"
          ></iframe>
        </Box>
      </Container>
    </>
  );
};
export default YandexMapIframe;

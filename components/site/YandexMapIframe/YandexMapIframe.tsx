import { IconEmailCircle } from "@components/icons";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ContactInfoRow from "@components/site/LandingPage/ContactInfoRow";
import { EmailLink, PhoneLink } from "@components/ui";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import IconLocationCircle from "@components/icons/IconLocationCircle";
import MapStaticPic from "/public/images/map.png";
import { email, phoneNumber, locationPlace } from "@/const/contacts";

const YandexMapIframe = () => {
  return (
    <>
      <Container
        sx={{
          "&&": {
            px: 0,
            paddingTop: "30px",
          },
        }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <Paper
            elevation={3}
            sx={{
              zIndex: 2,
              position: { xs: "inherit", md: "absolute" },
              top: 0,
              marginBottom: { xs: "15px", md: 0 },
              minHeight: "440px",
              width: { xs: "100%", sm: "520px", md: "420px" },
              marginLeft: { lg: "-15px", xl: "-55px" },
              marginTop: { md: "43px" },
              border: "12px solid",
              borderColor: (theme) => theme.palette.background.paper,
              borderRadius: (theme) => theme.shape.borderRadius - 5 + "px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: "440px",
                border: "3px solid",
                borderColor: (theme) => theme.palette.primary.light,
                borderRadius: (theme) => theme.shape.borderRadius - 9 + "px",
                py: "30px",
                px: "44px",
                pl: "30px",
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
                  svgIcon={<IconLocationCircle />}
                  label={"Локация:"}
                  infoText={<>{locationPlace}</>}
                />
                <ContactInfoRow
                  svgIcon={<IconEmailCircle />}
                  label={"Почта:"}
                  infoText={<EmailLink email={email} />}
                />
              </Stack>
            </Box>
          </Paper>
          <Box
            sx={{
              zIndex: 0,
              height: "555px",
              width: { xs: "100%", md: "65vw", lg: "61vw", xl: "51vw" },
              marginLeft: "auto",
              marginRight: 0,
              border: "11px solid",
              borderColor: (theme) => theme.palette.background.paper,
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
              borderRadius: (theme) => theme.shape.borderRadius + "px",
            }}
          >
            <Image
              src={MapStaticPic}
              alt="Карта Мастер в Балашихе Центр города Балашиха"
              loading="lazy"
            />
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad7f99cfb2e4d2c1792e2ab48d50953d7910caad42f04a49772fcba177c53d91a&amp;source=constructor"
              loading="lazy"
              name="yandex-map-balashiha-map-iframe"
              title="Карта Мастер в Балашихе Центр города Балашиха"
            ></iframe>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default YandexMapIframe;

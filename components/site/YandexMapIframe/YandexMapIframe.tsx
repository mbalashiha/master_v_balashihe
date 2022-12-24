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
          paddingTop: "30px",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                zIndex: 2,
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
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Box
              sx={{
                zIndex: -1,
                backgroundRrepeat: "no-repeat",
                backgroundPosition: "center center",
                position: "relative",
                height: "555px",
                width: "100%",
                border: "11px solid",
                borderColor: (theme) => theme.palette.background.paper,
                "& iframe": {
                  height: "535px",
                  width: "100%",
                  border: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: (theme) => theme.shape.borderRadius + "px",
              }}
            >
              <Image
                src={MapStaticPic}
                alt="Карта Мастер в Балашихе Центр города Балашиха"
                loading="lazy"
                quality={92}
              ></Image>
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad7f99cfb2e4d2c1792e2ab48d50953d7910caad42f04a49772fcba177c53d91a&amp;source=constructor"
                loading="lazy"
                name="yandex-map-balashiha-map-iframe"
                title="Карта Мастер в Балашихе Центр города Балашиха"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default YandexMapIframe;

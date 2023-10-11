import {
  NEXT_PUBLIC_CONTACT_PHONE_TEXT,
  NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_LOCATION_PLACE,
} from "@framework/const";
import { IconEmailCircle } from "@components/icons";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import ContactInfoRow from "@components/site/LandingPage/ContactInfoRow";
import IconPhoneCircle from "@components/icons/IconPhoneCircle";
import IconLocationCircle from "@components/icons/IconLocationCircle";

const YandexMapIframe = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          background: "white",
          "&&": {
            px: 0,
            paddingTop: "30px",
          },
          position: "relative",
          marginBottom: { xs: 0, xl: "30px" },
          display: { xs: "block", md: "flex", lg: "block" },
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
              marginBottom: 0,
              height: { xs: "auto", md: "100%", lg: "auto" },
              minHeight: { xs: "440px", md: "100%", lg: "440px" },
              width: { xs: "100%", lg: "420px" },
              marginLeft: { lg: "-15px", xl: "-55px" },
              marginTop: { xs: "43px", md: 0, lg: "43px" },
              border: (theme) => `12px solid ${theme.palette.background.paper}`,
              borderBottomWidth: { xs: "3px", md: "10px", lg: "12px" },
              borderRightWidth: { xs: "12px", md: 0, lg: "12px" },
              borderRadius: {
                xs: 0,
                lg: "24px",
              },
              boxShadow: {
                xs: "none",
                lg: `0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)`,
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: { xs: "auto", md: "100%", lg: "auto" },
                minHeight: { xs: "440px", md: "100%", lg: "440px" },
                border: "3px solid",
                borderColor: "primary.light",
                borderRadius: (theme) => theme.shape.borderRadius - 9 + "px",
                py: "30px",
                pl: "30px",
                pr: 0,
                "& svg": {
                  width: "44px",
                  height: "44px",
                },
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
                  infoText={NEXT_PUBLIC_CONTACT_PHONE_TEXT}
                />
                <ContactInfoRow
                  svgIcon={<IconEmailCircle />}
                  label={"Почта:"}
                  infoText={NEXT_PUBLIC_CONTACT_EMAIL}
                />
                <ContactInfoRow
                  svgIcon={<IconLocationCircle />}
                  label={"На карте:"}
                  infoText={NEXT_PUBLIC_LOCATION_PLACE}
                />
              </Stack>
            </Box>
          </Paper>
        </Container>
        <Paper
          elevation={3}
          sx={{
            zIndex: 0,
            height: "555px",
            width: "100%",
            maxWidth: "1760px",
            marginLeft: "auto",
            marginRight: "auto",
            border: (theme) => `11px solid ${theme.palette.background.paper}`,
            borderRadius: { xs: 0, xl: "20px" },
            position: "relative",
            overflow: "hidden",
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
            src="/api/yandex-map-iframe.html"
            loading="lazy"
            name="yandex-map-balashiha-map-iframe"
            title="Карта Мастер в Балашихе Центр города Балашиха"
            sandbox="allow-scripts"
          ></iframe>
        </Paper>
      </Container>
    </>
  );
};
export default YandexMapIframe;

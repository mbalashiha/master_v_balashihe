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
import { BreaksBySymbol } from "@components/ui/BreaksBySymbol";

const YandexMapIframe = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        "&&": {
          p: { xs: 0, xl: "5px 30px 30px 30px" },
        },
        position: "relative",
        display: { xs: "block", md: "flex", lg: "block" },
      }}
    >
      <Container
        maxWidth={"lg"}
        sx={{
          "&&": {
            px: { xs: 0, md: 0, lg: 0 },
          },
          position: { xs: "inherit", lg: "relative" },
          display: { xs: "flex", lg: "block" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: { xs: "inherit", md: "600px", lg: "inherit" },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "#121212"
                : theme.palette.background.paper,
            p: "12px",
            maxWidth: "95vw",
            minWidth: { xs: "100%", lg: "380px" },
            height: { xs: "auto", md: "100%", lg: "auto" },
            overflow: "hidden",
            zIndex: 2,
            position: { xs: "inherit", lg: "absolute" },
            top: 0,
            marginBottom: 0,
            marginLeft: { lg: "-15px", xl: "-55px" },
            marginTop: { xs: "43px", md: 0, lg: "43px" },
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
              minHeight: { xs: "380px", md: "100%", lg: "380px" },
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
            <Stack direction={"column"} spacing={3} height="100%">
              <Typography
                component="div"
                variant="h1"
                fontSize="34px"
                lineHeight={"39px"}
                fontWeight={700}
              >
                Контакты
              </Typography>
              <Stack
                direction={"column"}
                spacing={{ xs: 3, md: 4, lg: 3 }}
                sx={{ flexGrow: { xs: "inherit", md: 1, lg: "inherit" } }}
                justifyContent={{
                  xs: "inherit",
                  md: "center",
                }}
              >
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
                  infoText={
                    <BreaksBySymbol>
                      {NEXT_PUBLIC_LOCATION_PLACE}
                    </BreaksBySymbol>
                  }
                />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
      <Paper
        elevation={8}
        sx={{
          zIndex: 0,
          width: "100%",
          maxWidth: "1760px",
          marginLeft: "auto",
          marginRight: "auto",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "#252525"
              : theme.palette.background.paper,
          border: "none",
          borderRadius: { xs: 0, xl: "20px" },
          p: 0,
          position: "relative",
          overflow: "hidden",
          height: "535px",
          "& iframe": {
            height: "100%",
            width: "100%",
            border: "none",
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
  );
};
export default YandexMapIframe;

import { Box, Container } from "@mui/material";
import Image from "next/image";
const YandexMapIframe = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            backgroundRrepeat: "no-repeat",
            backgroundPosition: "center center",
            position: "relative",
            height: "720px",
            "& iframe": {
              border: "none",
              height: "720px",
              width: "100%",
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
          }}
        >
          <Image
            src="/images/map.png"
            width="1904"
            height="800"
            alt="Карта Мастер в Балашихе Центр города Балашиха"
            loading="lazy"
          ></Image>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad7f99cfb2e4d2c1792e2ab48d50953d7910caad42f04a49772fcba177c53d91a&amp;source=constructor"
            width="100%"
            height="720"
            loading="lazy"
            name="yandex-map-balashiha-map-iframe"
            title="Карта Мастер в Балашихе Центр города Балашиха"
          ></iframe>
        </Box>
      </Container>
    </>
  );
};
export default YandexMapIframe;

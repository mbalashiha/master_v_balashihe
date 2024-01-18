import { MetrikaScriptsParser } from "@components/common";
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
import Image from "next/image";
import React from "react";
interface Props extends React.ComponentProps<typeof Box> {
  children: React.ReactNode | React.ReactNode[];
  TypographyProps?: React.ComponentProps<typeof Typography>;
}
const PosterCheckList = ({ children, sx, TypographyProps, ...rest }: Props) => {
  return (
    <Box
      component="ul"
      sx={{
        p: 0,
        m: 0,
        listStyleType: "none",
        "& li": {
          p: 0,
          m: 0,
          fontSize: "16pt",
          lineHeight: "20pt",
          display: "flex",
          flexDirection: "row",
          textAlign: "left",
          "&::before": {
            fontFamily: "Material Icons Outlined",
            color: "grey.700",
            fontStyle: "normal",
            content: `"\\e2e6"`,
            fontSize: "20pt",
            lineHeight: "20pt",
            pr: "4pt",
          },
        },
        ...sx,
      }}
      {...rest}
    >
      {React.Children.map(children, (child) => (
        <Typography {...(TypographyProps as any)} component="li">
          {typeof child === "string" ||
          typeof child === "number" ||
          !React.isValidElement(child) ? (
            <Box>{child}</Box>
          ) : (
            child
          )}
        </Typography>
      ))}
    </Box>
  );
};
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
const Obyablenie = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          "& p": {
            margin: 0,
          },
          borderBottom: "1px dashed black",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            pt: "10pt",
            textTransform: "uppercase",
            fontSize: "26pt",
            lineHeight: "28pt",
            whiteSpace: "nowrap",
            mx: 0,
            px: 0,
          }}
        >
          <LightGreyText>Компьютерный</LightGreyText>
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textTransform: "uppercase",
            fontSize: "48pt",
            lineHeight: "48pt",
            whiteSpace: "nowrap",
            margin: `0 0 4pt 0`,
          }}
        >
          Мастер
          <LightGreyText>-</LightGreyText>в<LightGreyText>-</LightGreyText>
          Балашихе<LightGreyText>.рф</LightGreyText>
        </Typography>
        <Box
          sx={{
            position: "relative",
            "& img.bigBackgroundImage": {
              position: "absolute",
              bottom: "-60pt",
              right: "-25pt",
              height: "388pt",
              width: "388pt",
              zIndex: -1,
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
            className="bigBackgroundImage"
          />
          <Grid container spacing={0}>
            <Grid
              item
              xs={3}
              sx={{
                "& img": {
                  objectFit: "contain",
                  width: "100%",
                  height: "auto",
                },
              }}
            >
              <Typography
                fontSize="24pt"
                lineHeight="28pt"
                variant="h2"
                color="grey.600"
                fontWeight={400}
              >
                Мой сайт:
              </Typography>
              <Image
                src="/images/advert/site_url_qr_code.svg"
                width={1600}
                height={1600}
                unoptimized
                alt=""
                loading="eager"
              />
              <Typography
                color="grey.600"
                sx={{ fontSize: "20pt", textTransform: "uppercase" }}
              >
                mbalashiha.ru
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                textAlign: "right",
                minHeight: "200pt",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
              }}
            >
              <Stack
                direction={"row"}
                alignItems="flex-end"
                justifyContent={"flex-end"}
              >
                <Typography
                  fontSize="28pt"
                  lineHeight={"30pt"}
                  variant="h2"
                  color="grey.700"
                  fontWeight={600}
                  component="div"
                >
                  тел.&nbsp;
                </Typography>
                <Typography
                  fontSize="36pt"
                  lineHeight={"40pt"}
                  variant="h2"
                  color="grey.800"
                  fontWeight={600}
                  component="div"
                >
                  {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
                </Typography>
              </Stack>
              <PosterCheckList
                sx={{
                  maxWidth: "380pt",
                }}
              >
                <Box>Ремонт компьютеров и ноутбуков</Box>
                <Box>Установка программ Linux и Windows</Box>
                <Box>Настройка Интернета и WI-FI</Box>
                <Box>Компьютерная помощь</Box>
                <Box>Обучение компьютерной грамотности</Box>
                <Box>
                  Ремонт электрики, розеток, выключателей и светильников,
                  сверление отверстий в стенах
                </Box>
                <Box>Низкие цены для Балашихи</Box>
              </PosterCheckList>
            </Grid>
            <Grid item xs={12}>
              <PosterCheckList
                sx={{
                  color: "grey.500",
                  fontSize: "10pt",
                }}
              >
                <Box>Создание сайтов-визиток и интернет-магазинов</Box>
                <Box>
                  Мастер имеет высшее техническое образование Информационные
                  системы и технологии, инженер специалист, РТУ МИРЭА
                </Box>
              </PosterCheckList>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container
        maxWidth="md"
        sx={{
          borderBottom: "1px dashed black",
          px: 0,
        }}
      >
        <Box
          width="100%"
          sx={{
            display: "grid",
            placeItems: "center",
            gridTemplateColumns: "repeat(3,1fr)",
          }}
        >
          {[1, 2, 3].map((str, index, array) => (
            <Stack
              width="100%"
              key={index}
              direction="column"
              sx={{
                fontSize: "14pt",
                borderRight:
                  index === array.length - 1 ? "none" : "1px dashed black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                color: "black",
              }}
            >
              <Box>{"Компьютерный мастер"}</Box>
              <Box>{"Дмитрий"}</Box>
              <Box>{NEXT_PUBLIC_CONTACT_PHONE_TEXT}</Box>
            </Stack>
          ))}
        </Box>
      </Container>
    </>
  );
};
export default function AdvertPoster1() {
  return (
    <>
      {[1, 2].map((_, index) => (
        <Obyablenie key={index} />
      ))}
      <>
        {process.env.metrika_counters && (
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={"4px"}
          >
            <MetrikaScriptsParser
              htmlString={process.env.metrika_counters || ""}
            />
          </Stack>
        )}
      </>
    </>
  );
}

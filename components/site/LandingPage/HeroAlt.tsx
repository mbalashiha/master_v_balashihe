import { Container, Grid, Card, Paper, Button, Stack } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { DescriptionParser } from "@components/common/Article";
import React, { useEffect, useMemo, useRef } from "react";
import { Blog } from "@common/types/cms";
import useCountViews from "@framework/site/use-count-views";
import { useSiteModal } from "@components/site/ModalProvider/ModalProvider";
import Link from "next/link";
import { getCanonicalUrl, makeImageType } from "@framework/utils/normalize";
import Head from "next/head";
import { CMS } from "@common/types";
import { grey } from "@mui/material/colors";
import VkIcon from "public/icons/vk.svg";
import TelegramIcon from "public/icons/telegram-fill.svg";
import UTMLink from "@components/ui/UTMLink";
import CutProtocol from "@components/ui/CutProtocol";
import CutHostname from "@components/ui/CutHostname";

const StyledContactButton = ({
  sx,
  children,
  ...rest
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      sx={{
        px: "10px",
        py: "2px",
        border: "none",
        borderRadius: "6px",
        background: "transparent",
        color: "primary.main",
        fontWeight: 600,
        textTransform: "uppercase",
        "& svg": {
          fill: "white",
        },
        "&:hover": {
          background: "transparent",
          color: "white",
          boxShadow: "none",
        },
        // fontFamily: "var(--article-text-font-family)",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

interface Props {
  article: Blog.Article;
}
export default function Hero({ article }: Props) {
  if (!article || !article.renderHtml) {
    throw new Error("No article for this page!");
  }
  const countViews = useCountViews();
  const countViewsRef = useRef(countViews);
  useEffect(() => {
    countViewsRef.current = countViews;
  }, [countViews]);
  useEffect(() => {
    if (article.id) {
      const countViews = countViewsRef.current;
      countViews({ articleId: article.id });
    }
  }, [article.id]);
  const { toggleModal } = useSiteModal();
  const title = `Меня зовут Дмитрий, я закончил МГТУ МИРЭА со специальностью Информационные системы и технологии - это компьютерный сервис ${
    process.env.NEXT_PUBLIC_SITE_NAME || "Мастер-в-Балашихе.РФ"
  } 143912`;
  const indexCanonicalUrl = useMemo(() => getCanonicalUrl("/"), []);
  if (!article?.image?.canonicalUrl) {
    throw new Error("No article.image.canonicalUrl for link.");
  }
  return (
    <>
      <Head>
        <link rel="canonical" href={indexCanonicalUrl} />
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={indexCanonicalUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`Нужен мастер на дом или в офис? Если Вам нужно решить проблему, связанную с работой компьютера, информационными технологиями или нужно срочно починить ноутбук, моноблок, рабочую станцию или другую электротехнику:
Оставьте заявку и я перезвоню Вам в течение 30 минут,
работаю в городе Балашиха и Москве`}
        />
        <meta property="og:image" content={article.image.canonicalUrl} />
        <meta
          property="og:image:width"
          content={article.image.width.toString()}
        />
        <meta
          property="og:image:height"
          content={article.image.height.toString()}
        />
      </Head>
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          overflow: "hidden",
          py: 0,
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(/images/circuit.webp)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachment: "scroll",
            height: "100%",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            filter: "blur(0.3px)",
          }}
        ></Box>
        <Box
          sx={{
            backgroundImage: `linear-gradient(to bottom, rgba(27, 10, 0, 0.7), rgba(1,1,1,1))`,
            willChange: "transform",
            height: "100%",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            transform: `translateZ(0)`,
          }}
        ></Box>
        <Container
          maxWidth="lg"
          sx={{
            "&, & *": {
              fontFamily: `var(--text-font-family)`,
              color: "white",
              textAlign: { xs: "center", lg: "left" },
              "& p": { my: 0 },
            },
            position: "relative",
            zIndex: 2,
            mt: 4,
            pb: 0,
            px: { xs: "15px", sm: 0 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 0, lg: "20px" },
          }}
        >
          <Box
            sx={{
              gridRow: `1`,
              gridColumn: `1`,
            }}
          >
            <Box
              sx={{
                maxWidth: "92vw",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  pt: { xs: "20px", sm: "40px", md: 0, lg: "40px" },
                  fontSize: { xs: "32px", sm: "42px", md: "26px", lg: "42px" },
                  lineHeight: {
                    xs: "48px",
                    sm: "65px",
                    md: "38px",
                    lg: "65px",
                  },
                  fontWeight: 500,
                  textTransform: "uppercase",
                  mb: 0,
                  fontFamily: `var(--text-font-family)`,
                }}
                itemProp="name"
                variant="h1"
                component="h1"
              >
                <Box
                  component={"span"}
                  sx={{
                    px: "12px",
                    py: { xs: "7px", sm: "0" },
                    background: (theme) => `${theme.palette.primary.main}2e`,
                    borderRadius: "6px",
                  }}
                >
                  Мастер
                </Box>
                <Box>на дом или в офис </Box>
                <Box
                  sx={{
                    my: { xs: "5px", sm: "inherit" },
                  }}
                >
                  <Box
                    component={"span"}
                    sx={{
                      px: "12px",
                      py: { xs: "7px", sm: "0" },
                      background: (theme) => `${theme.palette.primary.main}2e`,
                      borderRadius: "6px",
                    }}
                  >
                    в Балашихе
                  </Box>
                </Box>
              </Typography>
            </Box>
          </Box>
          <Stack
            sx={{
              fontSize: "18px",
              lineHeight: "28px",
              gridRow: { xs: `3`, md: `2` },
              gridColumn: { xs: `1`, md: `1` },
              justifyContent: `space-between`,
              alignItems: { xs: "center", md: "flex-start" },
              maxWidth: { xs: "91vw", sm: "inherit" },
              pb: { xs: 0, md: "90px" },
            }}
            spacing={2}
          >
            <meta
              itemProp="model"
              content="Компьютерный мастер окончил МГТУ МИРЭА (Московский институт радиотехники, электроники и автоматики) со специальностью Информационные системы и технологии"
            />
            <Box
              itemProp="description"
              sx={{
                textAlign: { xs: "center", sm: "center", md: "left" },
                "&&": {
                  marginTop: { xs: 0, md: undefined },
                },
              }}
            >
              {`Меня зовут Дмитрий, 
              я закончил Московский институт радиотехники, электроники и автоматики со специальностью `}
              <strong>
                <Link href="/computer-master-balashiha">
                  Информационные системы и технологии
                </Link>{" "}
                (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  title="МИРЭА - РОССИЙСКИЙ ТЕХНОЛОГИЧЕСКИЙ УНИВЕРСИТЕТ"
                  href={`https://www.mirea.ru/`}
                >
                  МГТУ МИРЭА
                </Link>
                )
              </strong>
              {`. Если Вам нужно решить проблему, связанную с работой компьютера, информационными технологиями или нужно срочно починить ноутбук, моноблок, рабочую станцию или другую электротехнику: `}
            </Box>
            <Box
              component="strong"
              sx={{
                display: "block",
                fontSize: "20px",
                fontWeight: 400,
                textAlign: "left",
                mt: 0,
                mb: 0,
                px: "30px",
              }}
            >
              Оставьте заявку и я перезвоню Вам в течение 30 минут, работаю в
              городе Балашиха и Москве
            </Box>
            <Grid
              container
              sx={{
                maxWidth: "600px",
                width: "100%",
                p: 0,
                borderRadius: "6px",
                overflow: "hidden",
                border: (theme) => `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <Grid
                item
                xs={12}
                md={8}
                sx={{
                  overflow: "hidden",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    py: "18px",
                    px: "40px",
                    background: (theme) => theme.palette.primary.main,
                    border: "none",
                    borderRadius: 0,
                    m: 0,
                    fontSize: "24px",
                    lineHeight: "31px",
                    fontWeight: 400,
                    color: grey[100],
                    "&:hover": {
                      background: (theme) => theme.palette.primary.dark,
                      color: "white",
                    },
                  }}
                  onClick={() => toggleModal("contact request form")}
                >
                  Вызвать мастера
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  minHeight: "60px",
                  py: "8px",
                  px: "37px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    width: "auto",
                    color: "white",
                    textAlign: "left",
                    fontSize: "18px",
                    lineHeight: "25px",
                  }}
                >
                  Консультация бесплатная
                </Typography>
              </Grid>
            </Grid>
            <Stack direction="row" flexWrap="wrap">
              {process.env.NEXT_PUBLIC_VK_LINK && (
                <UTMLink
                  href={process.env.NEXT_PUBLIC_VK_LINK}
                  target="_blank"
                  title="Вконтакте"
                >
                  <StyledContactButton startIcon={<VkIcon />}>
                    <CutProtocol>{process.env.NEXT_PUBLIC_VK_LINK}</CutProtocol>
                  </StyledContactButton>
                </UTMLink>
              )}
              {process.env.NEXT_PUBLIC_TELEGRAM_LINK && (
                <UTMLink
                  href={process.env.NEXT_PUBLIC_TELEGRAM_LINK}
                  target="_blank"
                  title="Telegram messager"
                >
                  <StyledContactButton startIcon={<TelegramIcon />}>
                    <CutHostname>
                      {process.env.NEXT_PUBLIC_TELEGRAM_LINK}
                    </CutHostname>
                  </StyledContactButton>
                </UTMLink>
              )}
            </Stack>
          </Stack>
          <Box
            sx={{
              zIndex: -1,
              gridRow: { xs: `span 1`, md: `span 2` },
              gridColumn: { xs: `1`, md: `2` },
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              p: {
                xs: 0,
                md: "0 0 0 30px",
                lg: "30px 30px 0 50px",
                xl: "0 110px 0 20px",
              },
              "& a": {
                display: "block",
                position: "relative",
                width: "100%",
                maxWidth: "96vw",
                overflow: "visible",
                "& img": {
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                },
              },
            }}
          >
            <Link
              itemProp="image"
              href={article.image.canonicalUrl}
              target="_blank"
            >
              <Image
                alt="Информационные системы и технологии"
                width={600}
                height={902}
                quality={90}
                loading={"eager"}
                src="/images/computer_master_landing_balashiha.webp"
                title="Компьютерный мастер"
              />
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                  filter: "blur(35px)",
                  transform: "translate(0,50%)",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "140px",
                    backgroundColor: "var(--landing-background-color)",
                  }}
                ></Box>
              </Box>
            </Link>
          </Box>
        </Container>
      </Container>
    </>
  );
}

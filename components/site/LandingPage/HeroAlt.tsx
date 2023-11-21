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
  const title = `Компьютерный сервис MBalashiha.ru - Меня зовут Дмитрий, я окончил МГТУ МИРЭА со специальностью Информационные системы и технологии`;
  const indexCanonicalUrl = useMemo(() => getCanonicalUrl("/"), []);
  const image: CMS.Image = useMemo(() => {
    const url = "/images/master_v_balashihe.jpg";
    return makeImageType({
      url,
      width: 1197,
      height: 1600,
    });
  }, []);
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
        <meta property="og:image" content={image.canonicalUrl} />
        <meta property="og:image:width" content={image.width.toString()} />
        <meta property="og:image:height" content={image.height.toString()} />
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
            backgroundPosition: "center center",
            backgroundAttachment: "scroll",
            backgroundImage: `url(/images/circuit.webp)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        ></Box>
        <Box
          sx={{
            backgroundImage: `linear-gradient(to bottom, rgba(22, 14, 0, 0.7), rgba(1,1,1,1))`,
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
              fontFamily: `var(--landing-font-family)`,
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
          <Box sx={{ gridRow: `1`, gridColumn: `1` }}>
            <Box
              sx={{
                maxWidth: "92vw",
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
                  fontWeight: 600,
                  textTransform: "uppercase",
                  mb: 0,
                }}
                itemProp="name"
                variant="h1"
                component="h1"
              >
                <Box>Мастер</Box>
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
                      background: (theme) => `${theme.palette.primary.main}80`,
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
              gap: "16px",
              maxWidth: { xs: "91vw", sm: "inherit" },
              pb: { xs: 0, md: "80px" },
            }}
          >
            <meta
              itemProp="model"
              content="Компьютерный мастер окончил МГТУ МИРЭА со специальностью Информационные системы и технологии"
            />
            <Box
              itemProp="description"
              sx={{
                textAlign: { xs: "center", sm: "center", md: "left" },
              }}
            >
              {`Меня зовут Дмитрий, 
              я окончил МГТУ МИРЭА со специальностью `}
              <strong>
                <Link href="/computer-master-balashiha">
                  Информационные системы и технологии
                </Link>
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
                xl: "0 30px 0 90px",
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
            <Link itemProp="image" href={image.canonicalUrl} target="_blank">
              <Image
                alt="Информационные системы и технологии"
                width={600}
                height={909}
                quality={70}
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

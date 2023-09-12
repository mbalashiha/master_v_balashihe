import { Container, Grid, Card, Paper, Button, Stack } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { DescriptionParser } from "@components/common/Article";
import React, { useEffect, useRef } from "react";
import { Blog } from "@common/types/cms";
import useCountViews from "@framework/site/use-count-views";
import { useSiteModal } from "@components/site/ModalProvider/ModalProvider";
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
  return (
    <Container
      maxWidth={false}
      sx={{
        position: "relative",
        backgroundColor: "#010101",
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
          backgroundImage: `linear-gradient(to bottom, rgba(0, 6, 39, 0.7), rgba(1,1,1,1))`,
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
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
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
                pt: { xs: "20px", sm: "40px" },
                fontSize: { xs: "32px", sm: "42px" },
                lineHeight: { xs: "48px", sm: "65px" },
                fontWeight: 600,
                textTransform: "uppercase",
                mb: 0,
              }}
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
            gridRow: { xs: `3`, lg: `2` },
            gridColumn: { xs: `1`, lg: `1` },
            justifyContent: `space-between`,
            alignItems: { xs: "center", lg: "flex-start" },
            gap: "16px",
            maxWidth: { xs: "91vw", sm: "inherit" },
            pb: { xs: 0, lg: "80px" },
          }}
        >
          <div>
            {`Меня зовут Дмитрий, 
              я окончил МГТУ МИРЭА со специальностью "Информационные системы и технологии".
            Если вам нужно решить проблему, связанную с электроприборами, компьютерами и
            информационными технологиями, или нужно срочно починить ноутбук,
            компьютер или другую цифровую технику, оставьте заявку и я перезвоню
            в течение 30 минут, работаю в городе Балашиха и Москве. `}
          </div>
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
                  fontSize: "22px",
                  lineHeight: "31px",
                  color: "black",
                  "&:hover": {
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
            gridRow: { xs: `span 1`, lg: `span 2` },
            gridColumn: { xs: `1`, lg: `2` },
            textAlign: "center",
            pl: { xs: 0, lg: "20px" },
            "& img": {
              maxWidth: "96vw",
              height: "auto",
            },
          }}
        >
          <Image
            alt=""
            width={477}
            height={610}
            quality={89}
            src="/images/computer-master-landing-balashiha.webp"
          />
        </Box>
      </Container>
    </Container>
  );
}

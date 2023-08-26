import { Container, Grid, Card, Paper } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DescriptionParser } from "@components/common/Article";
import React, { useEffect, useRef } from "react";
import { Blog } from "@common/types/cms";
import useCountViews from "@framework/site/use-count-views";
interface Props {
  article: Blog.Article;
}
export default function Hero({ article }: Props) {
  if (!article || !article.renderHtml) {
    throw new Error("No article for this page!");
  }
  let { renderHtml, title, image } = article;
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
  return (
    <Container
      maxWidth={false}
      sx={{
        position: "relative",
        minHeight: "680px",
        backgroundColor: "#010101",
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
        sx={{ position: "relative", zIndex: 2, mt: 4, pb: "55px" }}
      >
        <Image
          alt=""
          width={465}
          height={600}
          src="/images/computer-master-landing-balashiha.webp"
        />
      </Container>
    </Container>
  );
}

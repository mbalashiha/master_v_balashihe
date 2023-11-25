import {
  Container,
  Link as MuiLink,
  Grid,
  Card,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { grey } from "@mui/material/colors";
import Marquee from "react-fast-marquee";
import getTickerImages from "@framework/images/get-ticker-images";
import { CMS } from "@common/types";
interface Props {}
export default function LandingPhotoTicker({}: Props) {
  const [images, setimages] = useState<CMS.Image[]>([]);
  useEffect(() => {
    getTickerImages().then((images) => setimages(images));
  }, []);
  return (
    <Container
      maxWidth={false}
      sx={{
        pb: 0,
        minHeight: { xs: "560px", md: "500px" },
        "& a, & img": {
          height: "400px",
          minWidth: "534px",
          width: "auto",
          objectFit: "cover",
        },
      }}
    >
      <Typography
        component="div"
        variant="h1"
        sx={{
          mt: { xs: 0, sm: 4 },
          mb: 4,
          textAlign: "center",
        }}
      >
        <Box component="span" color="primary.main">
          Опыт работы
        </Box>{" "}
        с различной компьютерной техникой
      </Typography>
      <Marquee>
        {images.map((im) => (
          <MuiLink
            key={im.imgSrc}
            sx={{
              display: "block",
              mx: 2,
              borderRadius: 1,
              overflow: "hidden",
            }}
            href={im.url}
            target={"_blank"}
          >
            <Image
              alt="Информационные системы и технологии"
              width={534}
              height={400}
              quality={80}
              src={im.url}
              title="Компьютерный мастер"
            />
          </MuiLink>
        ))}
      </Marquee>
    </Container>
  );
}

import StartIcon from "@mui/icons-material/Start";
import Link from "next/link";
import { standartCssTransition } from "@components/ui/theme/mui-theme";
import ContactDialog from "@components/site/contacts/ContactDialog";
import RenderIfVisible from "react-render-if-visible";
import {
  Container,
  Grid,
  Card,
  Paper,
  Button,
  Stack,
  Box,
  CardMedia,
  CardActions,
  CardHeader,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { blueGrey } from "@mui/material/colors";
import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import { Link as MuiLink } from "@mui/material";

interface Props {
  image: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
  title: React.ReactNode | React.ReactNode[];
  timeAmount: string;
}
export default function TaskCard({
  image,
  children,
  title,
  timeAmount,
}: Props) {
  let imgSrc = "";
  React.Children.forEach(image, (img, i) => {
    if (React.isValidElement(img)) {
      if (img.props.src && typeof img.props.src === "string") {
        imgSrc = img.props.src;
      }
    }
  });
  return (
    <Grid item xs={12}>
      <Grid
        itemProp="offers"
        itemScope
        itemType="https://schema.org/Offer"
        container
        spacing={{ xs: "8px", md: "12px", lg: "35px" }}
      >
        <Box sx={{ display: "none" }}>
          <link itemProp="availability" href="https://schema.org/InStock" />
          <meta itemProp="price" content="0" />
          <meta itemProp="priceCurrency" content="RUB" />
        </Box>
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 2, md: 1 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
            gap: "27px",
            "&, & *": {
              fontFamily: `var(--landing-font-family)`,
            },
          }}
        >
          <Typography
            component="h5"
            variant="h5"
            itemProp="name"
            sx={{
              color: "white",
              opacity: 0.5,
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "37px",
              fontFamily: `var(--landing-font-family)`,
            }}
          >
            {title}
          </Typography>
          {timeAmount && (
            <Typography
              component="time"
              sx={{
                color: "white",
                textAlign: "left",
                fontSize: "18px",
                lineHeight: "25px",
                fontFamily: `var(--landing-font-family)`,
              }}
            >
              {`Время работы - ${timeAmount}`}
            </Typography>
          )}
          <Typography
            itemProp="description"
            sx={{
              color: "white",
              textAlign: "left",
              fontSize: "16.5px",
              lineHeight: "25px",
              fontFamily: `var(--landing-font-family)`,
            }}
          >
            {children}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 1, md: 2 }}
          itemProp="image"
          itemScope
          itemType="https://schema.org/ImageObject"
          sx={{
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
            },
          }}
        >
          <meta itemProp="image" content={imgSrc} />
          {image}
        </Grid>
      </Grid>
    </Grid>
  );
}

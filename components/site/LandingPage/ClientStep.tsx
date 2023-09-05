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
  imageUrl: string;
  children: React.ReactNode | React.ReactNode[];
  title: React.ReactNode | React.ReactNode[];
}
export default function ClientStep({ imageUrl, children, title }: Props) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      sx={{
        "& img": {
          opacity: 0.8,
          mb: "20px",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        "& p, & div, & .Typography-root": {
          color: "white",
        },
      }}
    >
      <Box
        sx={{
          opacity: 0.8,
          mb: "20px",
          minWidth: "172px",
          minHeight: "172px",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <RenderIfVisible>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
            }}
          ></Box>
        </RenderIfVisible>
      </Box>
      <Typography
        component="div"
        sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "37px" }}
      >
        {title}
      </Typography>
      <Typography
        sx={{ fontSize: "20px", lineHeight: "31px", textAlign: "center" }}
      >
        {children}
      </Typography>
    </Grid>
  );
}

import StartIcon from "@mui/icons-material/Start";
import Link from "next/link";
import { standartCssTransition } from "@components/ui/theme/mui-theme";
import ContactDialog from "@components/site/contacts/ContactDialog";
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
import { useSiteModal } from "../ModalProvider";

interface Props {
  header: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
  imageUrl: string;
}
export default function LandingCard({ header, children, imageUrl }: Props) {
  const { toggleModal } = useSiteModal();
  return (
    <Grid item xs={12} lg={6}>
      <Card
        onClick={() => toggleModal("contact request form")}
        sx={{
          cursor: "pointer",
          height: "100%",
          overflow: "hidden",
          borderRadius: "12px",
          background: "#010101",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sm={7} md={6} lg={6}>
            <CardMedia
              itemScope
              itemType="https://schema.org/ImageObject"
              sx={{
                width: "100%",
                height: { xs: "340px", sm: "320px", md: "270px" },
                backgroundColor: "grey",
                "& a": {
                  display: "block",
                  width: "100%",
                  height: "100%",
                },
                "& img": {
                  minHeight: "100%",
                  maxHeight: "100%",
                  minWidth: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  width: "auto",
                  objectFit: "cover",
                },
              }}
            >
              <Link
                itemProp="image"
                href={imageUrl}
                onClick={(event) => event.preventDefault()}
              >
                <Image
                  src={imageUrl}
                  width={500}
                  height={500}
                  quality={40}
                  alt=""
                />
              </Link>
            </CardMedia>
          </Grid>
          <Grid item xs={12} sm={5} md={6} lg={6} sx={{ background: "white" }}>
            <Stack
              sx={{ height: "100%", p: "18px" }}
              direction={"column"}
              justifyContent={"space-between"}
              spacing={"14px"}
            >
              <CardHeader
                title={header}
                sx={{
                  "&&, && *": {
                    fontWeight: 700,
                    color: "black",
                    fontSize: "20px",
                    lineHeight: "27px",
                  },
                  py: 0,
                  px: 0,
                }}
              ></CardHeader>
              <CardContent
                sx={{
                  "&&, && *": { color: "black" },
                  opacity: 0.8,
                  px: 0,
                  py: 0,
                  fontSize: "15px",
                  lineHeight: "19px",
                  fontWeight: 500,
                }}
              >
                {children}
              </CardContent>
              <CardActions sx={{ px: 0, py: 0, justifySelf: "flex-end" }}>
                <Button
                  sx={{
                    py: "14px",
                    px: "20px",
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    ...standartCssTransition,
                    "&:hover": {
                      color: "white",
                      background: blueGrey[800],
                      boxShadow: "none",
                    },
                    "& .Button-startIcon": {
                      p: 0,
                      m: 0,
                      mr: "10px",
                    },
                    "&& svg": {
                      color: "white",
                      fill: "white",
                    },
                  }}
                  startIcon={<StartIcon />}
                >
                  Подробнее
                </Button>
              </CardActions>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

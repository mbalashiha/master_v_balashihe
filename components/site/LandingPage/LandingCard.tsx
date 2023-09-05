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

interface Props {
  header: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
  imageUrl: string;
}
export default function LandingCard({ header, children, imageUrl }: Props) {
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          height: "100%",
          overflow: "hidden",
          borderRadius: "12px",
          background: "#010101",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sm={5} md={5}>
            <CardMedia
              itemScope
              itemType="http://schema.org/ImageObject"
              sx={{
                height: "100%",
                width: "100%",
                minHeight: { xs: "310px", sm: "inherit" },
                backgroundColor: "grey",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
              }}
            >
              <meta itemProp="image" content={imageUrl} />
            </CardMedia>
          </Grid>
          <Grid item xs={12} sm={7} md={7} sx={{ background: "white" }}>
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
                <ContactDialog>
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
                </ContactDialog>
              </CardActions>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

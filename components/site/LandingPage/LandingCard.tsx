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
}
export default function LandingCard({ header, children }: Props) {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ height: "100%" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sm={6} md={4}>
            <CardMedia
              sx={{ height: "100%", minHeight: "120px", background: "gray" }}
            ></CardMedia>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Stack
              sx={{ height: "100%", p: "18px" }}
              direction={"column"}
              justifyContent={"space-between"}
              spacing={"14px"}
            >
              <CardHeader
                title={header}
                sx={{
                  "&, & > *, & > * > *": {
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
                sx={{ color: "black", px: 0, py: 0, fontSize: "16px" }}
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

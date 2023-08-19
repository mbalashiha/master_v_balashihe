import { Container, Grid, Card, Paper, Typography } from "@mui/material";
import Head from "next/head";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import util from "util";
import { Layout } from "@components/site";

// pages/404.tsx
const NotFoundPage = () => {
  return (
    <Container
      sx={{
        textAlign: "center",
        height: "550px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "25px",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "90px" }}>
        404
      </Typography>
      <Typography
        variant="h1"
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        Страница не найдена
      </Typography>
    </Container>
  );
};
NotFoundPage.Layout = Layout;
export default NotFoundPage;

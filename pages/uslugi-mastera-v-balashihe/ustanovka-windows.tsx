import { Layout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Page() {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе - Установкая</title>
        <meta
          name="description"
          content="Установка и активация лицензионной OC Windows в Балашихе"
        />
      </Head>
    </>
  );
}
Page.Layout = Layout;

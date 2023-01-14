import { ArticleLayout } from "@components/site";
import { Container, Grid, Card, Paper } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Article } from "@components/common/Article";

export default function Page() {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе</title>
        <meta
          name="description"
          content="Ремонт материнских плат в Балашихе и Московской области"
        />
      </Head>
      <Article title={`в Балашихе и Московской области`}>
        <Typography component="h2" variant="h2" gutterBottom></Typography>
        <p></p>
      </Article>
    </>
  );
}
Page.Layout = ArticleLayout;

import { Layout } from "@components/site";
import { Container } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Мастер в Балашихе - Закажите ремонт компьютера сегодня</title>
        <meta
          name="description"
          content="Мастер в Балашихе - Закажите ремонт компьютера сегодня"
        />
      </Head>
      <Container maxWidth="md" sx={{ pt: "200px" }}>
        <h1>Welcome to Next.js!</h1>

        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>
      </Container>
    </>
  );
}
Home.Layout = Layout;

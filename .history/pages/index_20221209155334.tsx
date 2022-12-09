import { Layout } from "@components/site";
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
      <h1>Welcome to Next.js!</h1>

      <p>
        Get started by editing <code>pages/index.tsx</code>
      </p>
    </>
  );
}
Home.Layout = Layout;

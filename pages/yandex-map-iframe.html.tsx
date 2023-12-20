// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export default function YandexMapIframe() {
  return <></>;
}
export const getServerSideProps = ({ res }: GetServerSidePropsContext) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(process.env.Yandex_Map_dangerouslySetInnerHTML || "");
  res.end();
  return { props: {} };
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export default function YandexMapIframeJS() {
  return <></>;
}
export const getServerSideProps = ({ res }: GetServerSidePropsContext) => {
  res.setHeader("Content-Type", "text/javascript; charset=utf-8");
  res.write(process.env.Yandex_Map_My_JS_Code || "");
  res.end();
  return { props: {} };
};

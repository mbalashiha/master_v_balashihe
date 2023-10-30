import Breadcrumbs from "@components/common/Breadcrumbs/Breadcrumbs";
import { useMemo } from "react";

interface Props {
  title: string;
  url: string;
}

export default function ArticleBreadcrumbs({ title, url }: Props) {
  const pathArray = useMemo(() => {
    return [
      { href: "/", title: "Главная" },
      { href: "/uslugi-mastera-v-balashihe/", title: "Компьютерный мастер" },
      // { href: url, title: title },
    ];
  }, []);
  return <Breadcrumbs path={pathArray} />;
}

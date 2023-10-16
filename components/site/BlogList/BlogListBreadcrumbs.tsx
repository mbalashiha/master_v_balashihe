import Breadcrumbs from "@components/common/Breadcrumbs/Breadcrumbs";
import { useMemo } from "react";

interface Props {}

export default function BlogListBreadcrumbs({}: Props) {
  const pathArray = useMemo(() => {
    return [
      { href: "/", title: "Главная" },
      { href: "/uslugi-mastera-v-balashihe/", title: "Компьютерный мастер" },
    ];
  }, []);
  return <Breadcrumbs path={pathArray} />;
}

import { Blog } from "@common/types/cms";
import NavSidebar from "./NavSidebar";

interface Props {
  recentArticles: Blog.NavigationItem[];
}
export const BlogRootSidebar = ({ recentArticles }: Props) => {
  return (
    <NavSidebar
      title={"Популярное"}
      sx={{ width: "100%" }}
      ariaLabel="recent articles"
      list={recentArticles}
    />
  );
};
export default BlogRootSidebar;

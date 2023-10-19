import { Blog } from "@common/types/cms";
import NavigationList from "./NavigationList";
import NavSidebarContainer from "./NavSidebarContainer";

interface Props {
  recentArticles: Blog.NavigationItem[];
}
export const BlogRootSidebar = ({ recentArticles }: Props) => {
  return (
    <NavSidebarContainer
      title={"Недавние"}
      sx={{ width: "100%", height: { lg: "800px" } }}
      ariaLabel="recent articles"
    >
      {recentArticles && <NavigationList articlesList={recentArticles} />}
    </NavSidebarContainer>
  );
};
export default BlogRootSidebar;

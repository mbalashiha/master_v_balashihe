import { CMS } from "@common/types";
import { Card, Stack, Box, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { blueGrey } from "@mui/material/colors";
import { MouseOverPopover } from "@components/ui";
import useDeleteArticle from "@framework/management/blog/article/use-delete-article";
import Link from "next/link";
interface Props {
  article: CMS.Blog.Article;
}
const ArticleItem = ({ article }: Props) => {
  const { id } = article;
  const deleteArticle = useDeleteArticle();
  return (
    <Link href={`/management/blog/article/edit/${id}`}>
      <Card>
        <Stack direction={"row"} spacing={2}>
          <Box flexGrow={1}>{article.title}</Box>
          <MouseOverPopover popoverText={"Удалить"}>
            <IconButton
              sx={{
                p: "3px",
                background: "transparent",
                "&:hover": {
                  background: blueGrey[100],
                },
              }}
              onClick={(event) => {
                event.stopPropagation();
                deleteArticle({ id });
              }}
            >
              <DeleteForeverOutlinedIcon
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontSize: "38px",
                }}
              />
            </IconButton>
          </MouseOverPopover>
        </Stack>
      </Card>
    </Link>
  );
};
export default ArticleItem;

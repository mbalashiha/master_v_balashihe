import { CMS } from "@common/types";
import { Card, Stack, Box, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { blueGrey } from "@mui/material/colors";
import { ConfirmDialog, MouseOverPopover } from "@components/ui";
import useDeleteArticle from "@framework/management/blog/article/use-delete-article";
import Link from "next/link";
interface Props {
  article: CMS.Blog.Article;
}
const ArticleItem = ({ article }: Props) => {
  const { id } = article;
  const deleteArticle = useDeleteArticle();
  return (
    <Card
      sx={{
        "& a": {
          display: "block",
          flexGrow: 1,
          height: "100%",
          minHeight: "40px",
          textOverflow: "ellipsis",
          maxWidth: "90%",
          overflowX: "hidden",
        },
      }}
    >
      <Stack direction={"row"} spacing={2}>
        <Link href={`/management/blog/article/edit/${id}`}>
          {article.title}
        </Link>
        <MouseOverPopover popoverText={"Удалить"}>
          <ConfirmDialog
            confirmCaption="Удалить"
            message={`Удалить публикацию "${article.title}"?`}
          >
            <IconButton
              sx={{
                p: "3px",
                background: "transparent",
                "&:hover": {
                  background: blueGrey[100],
                },
              }}
              onClick={() => {
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
          </ConfirmDialog>
        </MouseOverPopover>
      </Stack>
    </Card>
  );
};
export default ArticleItem;

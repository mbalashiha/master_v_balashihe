import { useField } from "@components/ui";
import { TextField } from "@mui/material";

export const ArticleTitle = () => {
  const [field, meta] = useField<string>("title");
  console.log(field, meta);
  return (
    <>
      <TextField
        label="Заголовок статьи"
        required
        sx={{ width: "100%" }}
        variant="filled"
        {...field}
      ></TextField>
    </>
  );
};
export default ArticleTitle;

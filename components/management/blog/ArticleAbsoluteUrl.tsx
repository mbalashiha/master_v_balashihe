import { useField, useRefFormik } from "@components/ui";
import {
  AlertPoper,
  ConfirmPopover,
  Tooltip,
  HtmlTooltip,
} from "@components/ui";
import useSaveArtDraftProps from "@framework/management/blog/article/draft/use-save-draft-props";
import { slugifyAbsUrl } from "@lib";
import {
  TextField,
  Paper,
  Box,
  Grid,
  FormControlLabel,
  FormGroup,
  Switch,
  Stack,
} from "@mui/material";

export const ArticleAbsoluteUrl = () => {
  const [field, meta] = useField<string>("absURL");
  const absURL = field.value || "";
  const onBlur = field.onBlur;
  const { setFieldValue } = useRefFormik();
  const setAbsUrl = (value: string) => setFieldValue("absURL", value);
  return (
    <>
      <TextField
        label="Полный путь страницы на сайте"
        sx={{ width: "100%", height: "71px" }}
        variant="filled"
        error={!!meta.error}
        helperText={meta.error}
        {...field}
        onBlur={(ev, ...rest) => {
          setAbsUrl(slugifyAbsUrl(ev.target.value));
          return onBlur(ev, ...rest);
        }}
      ></TextField>
      {absURL && (
        <Paper elevation={1} sx={{ width: "100%", p: 1, fontWeight: 600 }}>
          Перейти на страницу:{" "}
          <Tooltip title={"Абсолютный путь на сайте от корня"} inline>
            <a href={absURL} title={absURL} rel="noreferrer" target="_blank">
              {absURL}
            </a>
          </Tooltip>
        </Paper>
      )}
    </>
  );
};
export default ArticleAbsoluteUrl;

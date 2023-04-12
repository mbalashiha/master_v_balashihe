import { useRefFormik } from "@components/ui";
import { Box, Grid, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useField } from "formik";
import ArticleAbsoluteUrl from "./ArticleAbsoluteUrl";
import useSaveArtDraftProps from "@framework/management/blog/article/draft/use-save-draft-props";

export const ArticleFormParameters = () => {
  const [unPublishedField, unPublishedMeta] = useField("unPublished");
  const [notSearchableField, notSearchableMeta] = useField("notSearchable");
  const [notInListField, notInListMeta] = useField("notInList");
  const saveDraft = useSaveArtDraftProps();
  const { setFieldValue } = useRefFormik();
  const setUnPublished = (checked: boolean) => {
    setFieldValue("unPublished", !checked);
    process.nextTick(() => {
      saveDraft({});
    });
  };
  const setNotSearchable = (checked: boolean) => {
    setFieldValue("notSearchable", !checked);
    process.nextTick(() => {
      saveDraft({});
    });
  };
  const setNotInList = (checked: boolean) => {
    setFieldValue("notInList", !checked);
    process.nextTick(() => {
      saveDraft({});
    });
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <ArticleAbsoluteUrl />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          sx={{ width: "100%" }}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="end"
        >
          <FormGroup sx={{ minWidth: "265px" }}>
            <FormControlLabel
              control={
                <Switch
                  {...unPublishedField}
                  checked={!unPublishedField.value}
                  onChange={(event) => setUnPublished(event.target.checked)}
                />
              }
              label="Опубликована"
            />
            <FormControlLabel
              control={
                <Switch
                  {...notInListField}
                  checked={!notInListField.value}
                  onChange={(event) => setNotInList(event.target.checked)}
                />
              }
              label="Показывать в списке"
            />
            <FormControlLabel
              control={
                <Switch
                  {...notSearchableField}
                  checked={!notSearchableField.value}
                  onChange={(event) => setNotSearchable(event.target.checked)}
                />
              }
              label="Поиск по тексту"
            />
          </FormGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

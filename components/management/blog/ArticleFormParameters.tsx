import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";

export const ArticleFormParameters = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={"flex-end"}
      alignItems="end"
    >
      <FormGroup sx={{ minWidth: "265px" }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Опубликована"
        />
        <FormControlLabel control={<Switch />} label="Показывать в списке" />
        <FormControlLabel
          control={<Switch />}
          label="Поиск по тексту"
        />
      </FormGroup>
    </Box>
  );
};

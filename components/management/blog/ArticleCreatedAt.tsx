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
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const ArticleCreatedAt = () => {
  const [field, meta] = useField<Date | null>("publishedAt");
  const absURL = field.value || "";
  const saveDraft = useSaveArtDraftProps();
  const onBlur = field.onBlur;
  const { setFieldValue } = useRefFormik();
  const dayjsValue = React.useMemo(() => dayjs(field.value), [field.value]);
  console.log(field.value);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DateTimePicker
        label="Время публикации страницы на сайте"
        sx={{ width: "100%" }}
        // variant="filled"
        // error={!!meta.error}
        // helperText={meta.error}
        {...field}
        minDate={dayjs(new Date(0))}
        // onBlur={(ev, ...rest) => {
        //   saveDraft({});
        //   return onBlur(ev, ...rest);
        // }}
        value={dayjsValue}
        views={["year", "month", "day", "hours", "minutes", "seconds"]}
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        onChange={(newValue) => {
          try {
            if (newValue) {
              setFieldValue("publishedAt", newValue.toDate());
              process.nextTick(() => {
                saveDraft({});
              });
            }
          } catch (e: any) {
            alert(e.message);
          }
        }}
      ></DateTimePicker>
    </LocalizationProvider>
  );
};
export default ArticleCreatedAt;

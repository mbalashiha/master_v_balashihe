import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import LoadingButton from "./LoadingButton";
type Props = React.ComponentProps<typeof Button>;
const SubmitButton = ({ children, disabled, sx, ...rest }: Props) => {
  const ctx = useFormikContext() || {};
  return (
    <LoadingButton
      sx={{ ...sx }}
      disabled={Boolean(disabled || ctx.isSubmitting)}
      loading={ctx.isSubmitting}
      {...rest}
      type="submit"
    >
      {children}
    </LoadingButton>
  );
};
export default SubmitButton;

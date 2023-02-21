import {
  styled,
  Paper,
  Grid,
  Button,
  Box,
  Stack,
  TextField,
  FormGroup,
  CircularProgress,
  Backdrop,
} from "@mui/material";
interface Props extends Omit<React.ComponentProps<typeof Backdrop>, "open"> {
  isSubmitting: boolean;
}
const RelativeBackdrop = ({ isSubmitting, sx, ...rest }: Props) => {
  return (
    <Backdrop
      // sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isSubmitting}
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 2,
        backgroundColor: "rgba(255,255,255,0.2)",
        "& .MuiCircularProgress-root svg": {
          color: (theme) => theme.palette.primary.main,
          transform: "scale(2)",
        },
        ...sx,
      }}
      {...rest}
    >
      <CircularProgress color="inherit" sx={{}} />
    </Backdrop>
  );
};
export default RelativeBackdrop;

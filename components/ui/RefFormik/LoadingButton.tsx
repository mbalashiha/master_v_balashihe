import React, { FC, ComponentProps } from "react";
import { styled } from "@mui/material";
import { Button } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { blueGrey, grey } from "@mui/material/colors";
function MaskedCircularProgress(props: CircularProgressProps) {
  return (
    <>
      <CircularProgress
        variant="determinate"
        sx={{
          zIndex: 2,
          opacity: 0.015,
          position: "absolute",
          color: (theme) =>
            theme.palette.mode === "light" ? "black" : grey[500],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        sx={{
          zIndex: 3,
          opacity: 1,
          position: "absolute",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </>
  );
}
type Props = ComponentProps<typeof Button> & {
  loading?: boolean;
};
const ForwardedButton = React.forwardRef<HTMLButtonElement>(
  function LoadingButton(
    { children, type, loading, disabled, ...props }: Props,
    ref
  ) {
    type = type || "submit";
    return (
      <Button type={type} disabled={loading || disabled} {...props} ref={ref}>
        {children}
        {loading && <MaskedCircularProgress />}
      </Button>
    );
  }
);
const LoadingButton = styled(ForwardedButton)<Props>(({ theme, loading }) => ({
  "&&": {
    "&:disabled": {
      background: theme.palette.mode === "dark" ? grey[800] : grey[100],
      borderColor: grey[300],
      color: grey[300],
      boxShadow: "none",
    },
    "& .CircularProgress-root": {
      "& svg": {
        transform: "scale(1.4)",
      },
    },
  },
}));
export default LoadingButton;

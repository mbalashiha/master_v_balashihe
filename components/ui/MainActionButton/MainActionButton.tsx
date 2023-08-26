import React, { FC, ComponentProps } from "react";
import Link from "next/link";
import cn from "classnames";
import { styled } from "@mui/material";
import { Button, Box } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { blueGrey, grey } from "@mui/material/colors";
import { standartCssTransition } from "../theme/mui-theme";
function MaskedCircularProgress(props: CircularProgressProps) {
  return (
    <>
      <CircularProgress
        variant="determinate"
        sx={{
          zIndex: 2,
          opacity: 0.03,
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
const LoadingButton = React.forwardRef<HTMLButtonElement>(
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
const MainActionButton = styled(LoadingButton)<Props>(({ theme, loading }) => ({
  "&&": {
    zIndex: 1,
    width: "100%",
    background: theme.palette.primary.main,
    color: "white",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: "1rem",
    height: "auto",
    padding: "0.85rem",
    textTransform: "none",
    boxShadow: "0 0 5px rgba(0,0,0, 0.125)",
    border: "none",
    "&:hover": {
      background: theme.palette.primary.dark || "black",
      boxShadow: "0 0 30px rgb(13 70 144 / 40%)",
    },
    "&:disabled": {
      ...standartCssTransition,
      background: theme.palette.mode === "dark" ? grey[800] : grey[100],
      borderColor: grey[300],
      color: grey[300],
      boxShadow: "none",
    },
    "& .CircularProgress-root": {
      "& svg": {
        transform: "scale(2.2)",
      },
    },
  },
}));
export default MainActionButton;

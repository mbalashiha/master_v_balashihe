import * as React from "react";
import Image from "next/image";
import { Paper, Typography, Box } from "@mui/material";
type ImageProps = React.ComponentProps<typeof Image>;
type Props = React.ComponentProps<typeof Paper> & {
  src: ImageProps["src"];
  title: string;
  name: string;
  value: string | null;
  onChange: (event: { target: { name: string; value: string } }) => void;
};

export default function ImagePaper({
  src,
  title,
  onChange,
  name,
  value,
  sx,
  onClick: _,
  ...rest
}: Props) {
  return (
    <Paper
      elevation={2}
      sx={{
        cursor: "pointer",
        height: "100%",
        width: "100%",
        p: { xs: 0, sm: "7px" },
        overflow: "visible",
        borderRadius: "10px",
        background: "white",
        position: "relative",
        "& img": {
          height: "auto",
          width: { xs: "150px", sm: "100%" },
          mx: { xs: "20px", sm: "inherit" },
          transition: "linear",
          transitionDuration: "0.2s",
          transform: "scale(1.001)",
        },
        "&:hover": {
          "& img": {
            transform: "scale(1.1)",
          },
        },
        display: { xs: "flex", sm: "inherit" },
        flexDirection: { xs: "row", sm: "none" },
        "& .title": {
          p: { xs: "30px", sm: 0 },
        },
        ...sx,
      }}
      onClick={() => onChange({ target: { name, value: title } })}
      {...rest}
    >
      {value === title && (
        <Paper
          elevation={3}
          sx={{
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "35px",
            height: "35px",
            p: 0,
            borderRadius: "100%",
            backgroundColor: (theme) => theme.palette.primary.main,
            transform: "translate(-50%,-50%)",
            "&::before": {
              fontFamily: "Material Icons Round",
              fontStyle: "normal",
              paddingLeft: 0,
              paddingRight: "7px",
              paddingTop: 0,
              color: "white",
              fontSize: "32px",
              lineHeight: "32px",
              content: `"\\e876"`,
            },
          }}
        ></Paper>
      )}
      <Image src={src} alt="" width={300} height={300} />
      <Typography
        className={"title"}
        component={"div"}
        sx={{
          fontWeight: 400,
          fontSize: "18px",
          mt: "-4px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
}

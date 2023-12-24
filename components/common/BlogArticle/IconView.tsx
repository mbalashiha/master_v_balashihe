import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Fab,
} from "@mui/material";
import Link from "next/link";
import DescriptionParser from "./DescriptionParser";
import { HugeContainer, Tooltip } from "@components/ui";
import { CMS } from "@common/types";
import { HeaderTextParser } from "@components/common/HeaderTextParser";
import { CallMeForFree } from "@components/site/LandingPage";
import useCountViews from "@framework/site/use-count-views";
import React, { useEffect, useRef } from "react";
import { blueGrey, grey } from "@mui/material/colors";
import Image from "next/image";
type StackProps = React.ComponentProps<typeof Stack>;
interface Props extends Omit<StackProps, "children"> {
  popoverTitle?: string;
  iconContent: string;
  title: string;
  message: React.ReactNode | React.ReactNode[];
}

export default function IconView({
  message,
  title,
  popoverTitle,
  iconContent,
  sx,
  ...rest
}: Props) {
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      title={popoverTitle}
      sx={{
        "&::before": {
          fontFamily: "Material Icons Round",
          color: (theme) => theme.palette.primary.main,
          fontStyle: "normal",
          content: iconContent,
          fontSize: "38px",
          lineHeight: "38px",
          pr: "4px",
        },
        "&, & div, & p": {
          color: (theme) => theme.palette.primary.dark,
          fontWeight: 400,
          fontSize: "15px",
          lineHeight: "20px",
        },
        ...sx,
      }}
      {...rest}
    >
      <Stack direction={"column"} alignItems="flex-start">
        <Typography
          component={"div"}
          sx={{
            "&&": {
              pt: "3px",
              color: (theme) =>
                theme.palette.mode === "light" ? "black" : "white",
              fontWeight: 400,
            },
          }}
        >
          {title}:
        </Typography>
        <Typography
          component={"div"}
          sx={{
            "&&": {
              fontWeight: 400,
              lineHeight: "24px",
            },
          }}
        >
          {message}
        </Typography>
      </Stack>
    </Stack>
  );
}

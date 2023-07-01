import { Box } from "@mui/material";
import React, { memo } from "react";

interface Props {
  value: string;
}

const RenderNbsp = ({ value }: Props) => {
  return <>{value.replaceAll("&nbsp;", "\u00A0")}</>;
};
export default memo<Props>(RenderNbsp);

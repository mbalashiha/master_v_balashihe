import React, { useRef } from "react";
import MemoizedTinyMCE, { MemoizedTinyMCEProps } from "./MemozedTinyMCE";
import { styled } from "@mui/material";

export const TinyMCE = ({ initialValue, ...props }: MemoizedTinyMCEProps) => {
  const [fixedInitialValue] = React.useState(initialValue);
  return <MemoizedTinyMCE initialValue={fixedInitialValue} {...props} />;
};
export default TinyMCE;

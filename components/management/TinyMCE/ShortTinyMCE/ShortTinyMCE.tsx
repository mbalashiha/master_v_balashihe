import React, { useRef } from "react";
import MemoizedShort, { MemoizedShortProps } from "./MemozedShort";
import { styled } from "@mui/material";

export const ShortTinyMCE = ({ initialValue, ...props }: MemoizedShortProps) => {
  const [fixedInitialValue] = React.useState(initialValue);
  return <MemoizedShort initialValue={fixedInitialValue} {...props} />;
};
export default ShortTinyMCE;

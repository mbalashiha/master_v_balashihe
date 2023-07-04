import { default as MuiTextField } from "@mui/material/TextField";
import React from "react";

type Props = React.ComponentProps<typeof MuiTextField>;

const TextField = ({ children, sx, ...rest }: Props) => {
  return (
    <MuiTextField sx={{ width: "100%", ...sx }} variant="filled" {...rest}>
      {children}
    </MuiTextField>
  );
};

export default TextField;

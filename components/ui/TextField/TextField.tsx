import { default as MuiTextField } from "@mui/material/TextField";
import React from "react";

type Props = React.ComponentProps<typeof MuiTextField>;

const TextField = ({ sx, InputLabelProps, children, ...rest }: Props) => {
  return (
    <MuiTextField
      variant="outlined"
      sx={{
        "& .InputLabel-shrink": {
          background: "transparent",
          padding: "0 12px",
        },
        "& .InputBase-root.OutlinedInput-root": {
          borderRadius: "9px",
          "& input": { padding: "20px 15px 6px 15px" },
          "& fieldset": {
            border: "none",
          },
        },
        ...sx,
      }}
      InputLabelProps={{
        shrink: true,
        ...InputLabelProps,
      }}
      {...rest}
    >
      {children}
    </MuiTextField>
  );
};

export default TextField;

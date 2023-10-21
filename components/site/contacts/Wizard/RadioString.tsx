import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WizFormControl from "./WizFormControl";
import { EnhImage } from "@components/ui";
import WizRadio from "./WizRadio";
import React from "react";
import { Radio } from "@mui/material";
type Props = Omit<Omit<FormControlLabelProps, "control">, "label"> & {
  label?: React.ReactNode;
  value: string;
};
export default function RadioString({
  sx,
  value,
  label,
  ...props
}: Props) {
  label = label || value;
  return (
    <FormControlLabel
      control={<Radio />}
      value={value}
      label={label}
      sx={{
        background: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        m: 0,
        borderRadius: 1 / 2,
        boxShadow: 0,
        ...sx,
      }}
      {...props}
    />
  );
}

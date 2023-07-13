import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WizFormControl from "./WizFormControl";
import { EnhImage } from "@components/ui";
import WizRadio from "./WizRadio";
import React from "react";
type Props = Omit<Omit<FormControlLabelProps, "control">, "label"> & {
  label?: React.ReactNode;
  value: string;
  image: JSX.Element;
};
export default function RadioLabel({
  sx,
  value,
  label,
  image,
  ...props
}: Props) {
  label = label || value;
  return (
    <FormControlLabel
      control={<WizRadio image={image} />}
      value={value}
      label={label}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        background: (theme) => theme.palette.background.paper,
        m: 0,
        borderRadius: 1 / 2,
        boxShadow: 0,
        pt: 3,
        "& > span": {
          pt: 1 / 2,
          pb: 0.6,
          px: 1,
        },
        ...sx,
      }}
      {...props}
    />
  );
}

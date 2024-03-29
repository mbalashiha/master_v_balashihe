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
export default function RadioImageLabel({
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
      value={value || null}
      label={label}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        background: "white",
        fontWeight: 400,
        m: 0,
        borderRadius: 1 / 2,
        boxShadow: 0,
        pt: 3,
        "& > span:not(:first-of-type)": {
          pt: 1 / 2,
          pb: 0.6,
          px: 1,
        },
        "&, & img": {
          width: "200px",
          height: "200px",
        },
        ...sx,
      }}
      {...props}
    />
  );
}

import { Autocomplete as MuiAutocomplete } from "@mui/material";
import React from "react";
// type Props = React.ComponentProps<typeof MuiAutocomplete> & {};

const Autocomplete = React.forwardRef<
  typeof MuiAutocomplete,
  React.ComponentProps<typeof MuiAutocomplete>
>(({ sx, ...rest }, ref) => {
  return <MuiAutocomplete ref={ref} sx={{ width: "100%", ...sx }} {...rest} />;
});
Autocomplete.displayName = "MyMuiAutocomplete";

export default Autocomplete;

import { default as MuiTextField } from "@mui/material/TextField";

const TextField: typeof MuiTextField = ({ children, sx, ...rest }) => {
  return (
    <MuiTextField sx={{ width: "100%", ...sx }} variant="filled" {...rest}>
      {children}
    </MuiTextField>
  );
};

export default TextField;

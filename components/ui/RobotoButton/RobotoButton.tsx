import MuiButton from "@mui/material/Button";

type Props = React.ComponentProps<typeof MuiButton>;

const RobotoButton = ({ children, sx, ...props }: Props) => (
  <MuiButton
    {...props} 
    sx={{
      borderBottom: "2px solid #C4C4C4",
      pt: 1,
      "& > *": {
        fontSize: "2rem",
        fontFamily: "Roboto, Verdana",
      },
      ...sx,
    }}
  >
    {children}
  </MuiButton>
);

export default RobotoButton;
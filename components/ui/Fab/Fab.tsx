import { colors } from "@mui/material";
import { Fab as MuiFab } from "@mui/material";
type Props = React.ComponentProps<typeof MuiFab>;
const Fab = ({ children, sx, ...rest }: Props) => {
  return (
    <MuiFab
      sx={{
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiFab>
  );
};
export default Fab;

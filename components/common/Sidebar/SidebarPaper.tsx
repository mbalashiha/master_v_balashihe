import { styled, Paper, Box } from "@mui/material";
import { PaperBox } from "./PaperBox";
import { StyledHeader } from "./StyledHeader";
import { StyledPaper } from "./StyledPaper";
type PaperProps = React.ComponentProps<typeof Paper>;
type Props = PaperProps & {
  title?: React.ReactNode | React.ReactNode[];
  ellipsis?: boolean;
};
export const SidebarPaper = ({ title, children, ...rest }: Props) => {
  return (
    <>
      {title && <StyledHeader>{title}</StyledHeader>}
      {children}
    </>
  );
};
export default SidebarPaper;

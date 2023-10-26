import { Button, Box, Stack, LoadingCircle } from "@components/ui";
import { CircularProgress, styled } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import HandymanIcon from "@mui/icons-material/Handyman";
import React, { FC } from "react";
import { WhatsappLink } from "@components/site/contacts";
import ContactDialog from "@components/site/contacts/ContactDialog";
import { useSiteModal } from "@components/site/ModalProvider";
type SpanForStylingProps = React.ComponentProps<typeof Box> & {
  zIndex?: number;
  isLoading?: boolean;
};
const SpanForStyling = ({
  children,
  zIndex,
  isLoading,
  ...props
}: SpanForStylingProps) => (
  <Box component="span" {...props}>
    {children}
  </Box>
);
/** 
const StyledSpan = styled(SpanForStyling)<{
  zIndex: number;
  isLoading: boolean;
}>(({ theme, zIndex, isLoading }) => ({
  zIndex: zIndex || 1,
  marginLeft: "-50px",
  width: "70px",
  height: "70px",
  minWidth: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "100%",
  color: theme.palette.primary.main,
  fontWeight: 700,
  boxShadow: "0 0 30px rgb(13 70 144 / 20%)",
  border: `3px solid ${theme.palette.primary.main}`,
  "&&&": isLoading && {
    "&, &:hover": {
      backgroundColor: theme.palette.mode === "dark" ? grey[800] : grey[200],
      borderColor: theme.palette.mode === "dark" ? grey[700] : grey[300],
      color: grey[500],
    },
  },
}));
**/
type ButtonForStylingProps = React.ComponentProps<typeof Button> & {
  zIndex?: number;
  isLoading?: boolean;
};
const ButtonForStyling = ({
  zIndex,
  isLoading,
  ...props
}: ButtonForStylingProps) => <Button {...props} />;

const StyledButton: any = styled(ButtonForStyling)<{
  zIndex: number;
  isLoading: boolean;
}>(({ theme, zIndex, isLoading }) => ({
  "&&": {
    zIndex,
    padding: "1.5rem",
    // position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50px",
    color: theme.palette.primary.main,
    border: `3px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "#ffffff",
    },
    "&": isLoading && {
      "&, &:hover": {
        backgroundColor: theme.palette.mode === "dark" ? grey[800] : grey[200],
        borderColor: theme.palette.mode === "dark" ? grey[700] : grey[300],
        color: grey[500],
      },
    },
    fontSize: "18px",
    fontWeight: 700,
    textTransform: "uppercase",
    cursor: "pointer",
    whiteSpace: "nowrap",
    height: "61px",
    minWidth: "320px",
    ".Button-startIcon": {
      margin: 0,
      marginRight: "1.4rem",
      padding: 0,
    },
    ".Button-endIcon": {
      margin: 0,
      marginLeft: "0.3rem",
      padding: 0,
      marginTop: "-0.5rem",
    },
    "& .SvgIcon-root": {
      fontSize: "2rem",
    },
  },
}));
type Props = {
  isLoading?: boolean;
  disabled?: boolean;
  zIndex?: number;
};
const CallButton = ({ isLoading, disabled, zIndex }: Props) => {
  const { toggleModal } = useSiteModal();
  return (
    <StyledButton
      zIndex={zIndex || 0}
      isLoading={isLoading || false}
      disabled={isLoading || disabled}
      startIcon={<HandymanIcon />}
      onClick={() => toggleModal("contact request form")}
    >
      {`Вызвать мастера`}
    </StyledButton>
  );
};

export default CallButton;

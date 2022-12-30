import { Button, Box, styled, Stack, LoadingCircle } from "@components/ui";
import { CircularProgress } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import React, { FC } from "react";
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
  oneClickSended: boolean;
}>(({ theme, zIndex, isLoading, oneClickSended }) => ({
  "&&": {
    zIndex,
    padding: "0.5rem 4rem 0.5rem 1.5rem",
    margin: 0,
    // position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50px",
    color: "#ffffff",
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
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    cursor: "pointer",
    whiteSpace: "nowrap",
    height: "61px",
    maxWidth: "220px",
    minWidth: "190px",
    ".MuiButton-startIcon": {
      margin: 0,
      marginRight: "0.6rem",
      padding: 0,
    },
    ".MuiButton-endIcon": {
      margin: 0,
      marginLeft: "0.3rem",
      padding: 0,
      marginTop: "-0.5rem",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
}));
const SecondButton: any = styled(StyledButton)<{
  zIndex: number;
  isLoading: boolean;
  oneClickSended: boolean;
}>(({ theme, zIndex }) => ({
  "&&": {
    zIndex,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    boxShadow: "0 0 30px rgb(13 70 144 / 20%)",
    border: `3px solid ${theme.palette.primary.main}`,
    marginLeft: "-62px",
    padding: "0.5rem 5rem 0.5rem 8rem",
    maxWidth: "230px",
    minWidth: "160px",
  },
}));
type Props = {
  addToCartAction: React.MouseEventHandler<HTMLButtonElement>;
  inOneClickAction?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
  hideContentWhenLoading?: boolean;
  oneClickSended: boolean;
};
const SellButton = ({
  addToCartAction,
  inOneClickAction,
  oneClickSended,
  isLoading,
  disabled,
}: Props) => {
  return (
    <Stack
      component={"section"}
      direction="row"
      alignItems={"center"}
      minWidth={"340px"}
    >
      <StyledButton
        zIndex={1}
        isLoading={isLoading || false}
        disabled={isLoading || disabled}
        onClick={(!isLoading && addToCartAction) || (() => {})}
        aria-label="Добавить в корзину"
        title="Добавить в корзину"
        startIcon={<AddShoppingCartRoundedIcon />}
      >
        В корзину
      </StyledButton>
      <StyledSpan zIndex={2} isLoading={isLoading || false}>
        {(isLoading && <CircularProgress color="primary" />) || <>{"или"}</>}
      </StyledSpan>
      <SecondButton
        zIndex={0}
        isLoading={isLoading || false}
        disabled={isLoading || disabled}
        onClick={(!isLoading && inOneClickAction) || (() => {})}
        endIcon={oneClickSended && <CheckRoundedIcon />}
      >
        {oneClickSended ? "Отправлена" : "Заявка в 1 клик"}
      </SecondButton>
    </Stack>
  );
};

export default SellButton;

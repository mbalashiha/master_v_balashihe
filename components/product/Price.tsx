import { Button, IconButton, Box, Typography } from "@components/ui";
import { styled } from "@mui/material";
import { ComponentProps } from "react";
const StyledPriceAmount = styled(Typography)(({ theme, sx }) => ({
  "&&": {
    color: theme.palette.primary.main,
    fontSize: "26px",
    fontWeight: 900,
    fontFamily: "montserrat, sans-serif",
    ...sx,
  },
}));
interface Props extends ComponentProps<typeof StyledPriceAmount> {
  price: any;
}
export const PriceNode = ({ price, ...rest }: Props) => {
  let currencySymbol: string = price.currencyCode;
  if (currencySymbol === "RUB") {
    currencySymbol = "₽";
  }
  return (
    <StyledPriceAmount {...rest}>
      {price.amount ? (
        <>
          {"от "}
          {price.amount.toFixed(0)} {currencySymbol}
        </>
      ) : (
        "Бесплатно"
      )}
    </StyledPriceAmount>
  );
};

export default PriceNode;

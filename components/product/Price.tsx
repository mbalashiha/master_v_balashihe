import { Button, IconButton, Box, styled, Typography } from "@components/ui";
import { Price as PriceType } from "@common/types/product/product";
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
  price: PriceType;
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

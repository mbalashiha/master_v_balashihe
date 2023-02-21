import { Card, CardMedia, CardContent, CardHeader } from "@components/ui";
import { calculateAspectRatioFit } from "@lib/aspect-ration-fit";
import Link from "next/link";
import Image from "next/image";
import { ComponentProps, FC } from "react";
import cn from "classnames";
import PriceNode from "@components/product/Price";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CardMediaTypeMap } from "@mui/material";
interface Props
  extends ComponentProps<OverridableComponent<CardMediaTypeMap<{}, "div">>> {
  product: any;
}
const CardMediaImage = ({ sx, product, ...props }: Props) => {
  return (
    <CardMedia
      sx={{
        ...sx,
      }}
      {...props}
    >
      <Link href={product.url} passHref>
        {product.image?.url ? (
          <Image
            style={{ height: "100%" }}
            alt={product.title ?? "Product image"}
            src={product.image.url}
            quality={85}
            width={product.image.width}
            height={product.image.height}
            layout="responsive"
          />
        ) : (
          <></>
        )}
      </Link>
    </CardMedia>
  );
};
export default CardMediaImage;

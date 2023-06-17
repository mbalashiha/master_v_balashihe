import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
} from "@components/ui";
import { Grid } from "@mui/material";
import { calculateAspectRatioFit } from "@lib/aspect-ration-fit";
import { CardMediaImage } from "./CardMediaImage";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import cn from "classnames";
import PriceNode from "@components/product/Price";
interface Props {
  key: string;
  product: any;
}
const ProductCard: FC<Props> = ({ key, product }) => {
  return (
    <Grid key={key} item xs={12} component="section">
      <Link href={`${product.url}`} passHref>
        <Card
          sx={{
            height: "100%",
            width: "100%",
            borderRadius: 2,
            position: "relative",
            "& .CardMedia-root": {
              transform: "scale(1.0001)",
              transition: "transform .7s linear",
            },
            "&:hover": {
              "& .CardMedia-root": {
                transition: "all 1s",
                transform: "scale(1.1)",
              },
            },
          }}
        >
          <Stack direction={"row"}>
            <CardMediaImage
              sx={{ height: "100px", width: "200px" }}
              product={product}
            />
            <CardHeader
              title={<h3>{product.title}</h3>}
              subheader={
                <PriceNode
                  sx={{ fontSize: "1.2rem" }}
                  price={product.price!}
                ></PriceNode>
              }
            ></CardHeader>
          </Stack>
        </Card>
      </Link>
    </Grid>
  );
};
export default ProductCard;

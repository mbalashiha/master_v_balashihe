
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
} from "@components/ui";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { calculateAspectRatioFit } from "@lib/aspect-ration-fit";
import { CardMediaImage } from "./CardMediaImage";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import s from "./ProductCard.module.scss";
import cn from "classnames";
import PriceNode from "@components/product/Price";
import { Grid, Box, Button, Rating } from "@mui/material";
interface Props {
  product: any;
  key: string;
}
const GridProductCard: FC<Props> = ({ key, product }) => {
  // const cardClass = cn({
  //   [s.productCard]: true,
  //   [s.layoutA]: layout === "A",
  //   [s.layoutB]: layout === "B",
  // });
  return (
    <Grid
      key={key}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      component="section"
    >
      <Card
        sx={{
          borderRadius: 4,
          position: "relative",
          height: "100%",
          "& .MuiCardMedia-root": {
            transform: "scale(1.0001)",
            transition: "transform .7s linear",
            zIndex: 0,
          },
          "&:hover": {
            "& .MuiCardMedia-root": {
              transform: "scale(1.13)",
            },
          },
        }}
      >
        <CardMediaImage sx={{ height: "30%", zIndex: 0 }} product={product} />
        <Stack
          direction={"column"}
          sx={{
            height: "70%",
            padding: "30px 20px",
            textAlign: "center",
            "& h3": {
              display: "block",
              fontFamily: "montserrat, sans-serif",
              fontWeight: "700",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
          spacing={1}
          justifyContent="center"
          alignItems={"center"}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              "& h3": {
                margin: 0,
                padding: 0,
                zIndex: 1,
              },
            }}
          >
            <h3>
              <Link href={product.url} passHref>
                {product.title}
              </Link>
            </h3>
          </Box>
          <Rating
            name="read-only"
            value={null}
            readOnly
            sx={{
              fontSize: "1.8rem",
              "& .MuiRating-iconEmpty svg": { fill: "grey" },
            }}
          />
          <PriceNode price={product.price!}></PriceNode>
          <Box sx={{ width: "100%" }}>
            <Link href={product.url} passHref>
              <Button sx={{ width: "100%" }} startIcon={<EastRoundedIcon />}>
                Подробнее
              </Button>
            </Link>
          </Box>
        </Stack>
      </Card>
    </Grid>
  );
};
export default GridProductCard;

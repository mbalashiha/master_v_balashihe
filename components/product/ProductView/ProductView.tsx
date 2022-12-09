import React, { FC, useState, Suspense } from "react";
import { Stack, Button, useUI, Grid, Box, Container } from "@components/ui";
import Image from "next/image";
import { Product } from "@common/commerce/types";
import "@components/product/ProductSlider/ProductSlider";
import ProductSlider from "@components/product/ProductSlider/ProductSlider";
import useAddItem from "@framework/commerce/cart/use-add-item";
import PriceNode from "../Price";
import SellButton from "@components/product/SellButton";
// import GoToCartLink from "@components/product/GoToCartLink";
import parse, { attributesToProps } from "html-react-parser";
import { HTMLReactParserOptions, Element } from "html-react-parser";
import { OneClickSellModal } from "@components/cart";
import { ErrorsProvider } from "@components/ui/contexts/use-errors-context";
import { ImagePlacehoder } from "@components/icons";
interface ProductViewContext {
  oneClickSended: boolean;
  setOneClickSended: () => void;
  product: Product;
}
const ProductViewContext = React.createContext<Partial<ProductViewContext>>({});
export const useProductView = () => {
  return React.useContext(ProductViewContext) as ProductViewContext;
};
interface Props {
  product: Product;
}
const ProductView: FC<Props> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { openSidebar } = useUI();
  const addItem = useAddItem();
  const item = React.useMemo(
    () => ({
      productId: product.productId,
      quantity: 1,
    }),
    [product.productId]
  );
  const addToCart = async () => {
    try {
      setIsLoading(true);
      await addItem(item);
      setIsLoading(false);
      openSidebar();
    } catch (e: any) {
      setIsLoading(false);
      console.error(e.stack || e.message);
      console.error(e.stack || e.message);
    }
  };
  const [oneClickSended, setOneClickSended] = React.useState(false);
  const providedValue = React.useMemo(
    () => ({
      product,
      oneClickSended,
      setOneClickSended: () => setOneClickSended(true),
    }),
    [oneClickSended, product]
  );
  return (
    <ProductViewContext.Provider value={providedValue}>
      <Container
        maxWidth={false}
        sx={{
          m: "auto",
          px: { xs: "0.5rem", lg: "1rem", xl: "2rem" },
          py: {
            xl: "2rem",
          },
        }}
      >
        <Grid container spacing={{ xs: 1, md: 3, lg: 4, xl: 4.5 }}>
          <Grid
            item
            xs={12}
            md={6}
            xl={5}
            component="section"
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <ProductSlider>
              {Array.isArray(product.images) && product.images.length ? (
                product.images.map((image, index) => (
                  <Image
                    key={`${index}-${image.url}`}
                    src={image.url}
                    alt={image?.altText}
                    width={image.width}
                    height={image.height}
                    quality={85}
                    layout="responsive"
                  />
                ))
              ) : (
                <ImagePlacehoder />
              )}
            </ProductSlider>
          </Grid>
          <Grid item xs={12} md={6} xl={7} component="section">
            <Stack
              direction={"column"}
              spacing={2}
              sx={{
                "& h1": {
                  fontFamily: "Roboto, montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: "3.2rem",
                  color: "grey",
                },
              }}
            >
              <header>
                <h1>{product.title}</h1>
              </header>
              <section className="price">
                <PriceNode
                  sx={{
                    fontSize: "2.8rem",
                    fontWeight: "900",
                    m: 0,
                    mb: "1rem",
                  }}
                  price={product.price}
                ></PriceNode>
              </section>
              <section>
                <SellButton
                  isLoading={isLoading}
                  addToCartAction={addToCart}
                  inOneClickAction={handleOpen}
                  oneClickSended={oneClickSended}
                />
                <ErrorsProvider>
                  <OneClickSellModal open={open} handleClose={handleClose} />
                </ErrorsProvider>
              </section>
              {/* <section>
                <GoToCartLink />
              </section> */}
            </Stack>
          </Grid>
          <Grid item xs={12} component="article">
            {parse(product.descriptionHtml || "", {
              trim: true,
              replace: (domNode: any) => {
                if (domNode instanceof Element && domNode.attribs) {
                  const { attribs, children } = domNode;
                  if (domNode.name === "article") {
                    // const props = attributesToProps(domNode.attribs);
                    // return <>{props.children}</>;
                  }
                  if (typeof window !== "undefined") {
                    console.log(domNode);
                  }
                  if (domNode.name === "img") {
                    if (!attribs.src) {
                      return <></>;
                    }
                    if (/^https?\:\/\//im.test(attribs.src)) {
                      return <></>;
                    }
                  }
                  if (
                    [
                      "script",
                      "style",
                      "form",
                      "input",
                      "textarea",
                      "frame",
                      "iframe",
                    ].includes(domNode.name)
                  ) {
                    return <></>;
                  }
                }
                return domNode;
              },
            })}
          </Grid>
        </Grid>
      </Container>
    </ProductViewContext.Provider>
  );
};

export default ProductView;

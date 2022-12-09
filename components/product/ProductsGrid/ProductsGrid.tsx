import queryString from "query-string";
import { AddButton, useUI } from "@components/ui";
import { Button, Grid, Box, Container, Menu, MenuItem } from "@mui/material";
import { AlertsViewer, MySwitch } from "@components/ui";
import cookie from "cookie";
import Head from "next/head";
import React from "react";
import cn from "classnames";
import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import { getConfig } from "@framework/commerce/api/config";
import { getNavigationPath } from "@/src/get-navigation-props";
import excuteQuery from "@/src/db/execute-query";
import { IPageNavigationEntry, IPageProps } from "@/src/models/page-props";
import { getParentPagePath } from "@/src/get-navigation-props";
import PublicFileToBase64Uri from "@/src/util/public-file-to-base64-uri";
import { Product, ProductInList } from "@common/types/product/product";
import {
  GridProductCard,
  ListProductCard,
} from "@components/product/ProductCard";
import { getAllProductsPaths, getProduct } from "@framework/commerce/product";
import { useGridTypeProvider } from "@components/management/product/GridTypeProvider";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ProductView, ProductSlider } from "@components/product";
import { AddProductButton } from "@components/management/product";
import { API_USER_TOKEN_COOKIE } from "@framework/commerce/const";
import useProductsList from "@framework/commerce/management/product/use-products-list";
import { ProductsListViewSwitcher } from "@components/ui/ProductsListViewSwitcher/ProductsListViewSwitcher";
import { Stack } from "@mui/material";
import { SortIcon } from "@components/icons";
import SortButton from "@components/sorting/SortButton";
const ProductsGrid = ({ products }: { products: ProductInList[] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { viewGridType } = useGridTypeProvider();
  const ProductCard =
    viewGridType === "grid" ? GridProductCard : ListProductCard;
  products = [...products, ...products, ...products];
  return (
    <Container maxWidth="xl">
      <AlertsViewer />
      <Grid container spacing={4} sx={{ pt: 8 }}>
        {products.map((product, index) => (
          <ProductCard
            key={`${index}-${product.productId}`}
            product={product}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsGrid;


import { Button, Grid, Box, Container, Menu, MenuItem } from "@mui/material";
import Head from "next/head";
import React from "react";
import cn from "classnames";
import Link from "next/link";
import {
  GridProductCard,
  ListProductCard,
} from "@components/product/ProductCard";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
const ProductsGrid = ({ products }: { products: any }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} sx={{ pt: 8 }}>
      </Grid>
    </Container>
  );
};

export default ProductsGrid;

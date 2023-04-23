import Image from "next/image";
import React, { FC, useContext } from "react";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import {
  Container,
  Card,
  Grid,
  Paper,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Skeleton,
} from "@mui/material";

export interface ImageActionProps {
  length: number;
  width: number;
  height: number;
  up: (sourceIndex: number) => void;
  down: (sourceIndex: number) => void;
}
const ImageAction = (props: ImageActionProps) => {
  const { length, width = 280, height = 360, up, down } = props;
  return <></>;
};
export default ImageAction;

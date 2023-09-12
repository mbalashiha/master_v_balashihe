import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider, Button } from "@mui/material";
import ColBox from "./ColBox";

export default function ContactsList() {
  return (
    <ColBox>
      <Button>Заказать обратный звонок</Button>
    </ColBox>
  );
}

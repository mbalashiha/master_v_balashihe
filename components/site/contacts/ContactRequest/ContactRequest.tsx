import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import FormikForRequest from "./FormikForRequest";
import ContactForm from "./ContactForm";

export default function ContactRequest() {
  return <FormikForRequest><ContactForm /></FormikForRequest>;
}

import {
  Container,
  Grid,
  Card,
  Paper,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { blueGrey, grey } from "@mui/material/colors";
import React from "react";
import { ContactPhone } from "../contacts";
import ContactDialog from "../contacts/ContactDialog";
import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
interface Props {
  sx?: SxProps;
  paperSx?: SxProps;
}
export const CallMeForFree = ({ sx, paperSx }: Props) => {
  return (
    <Container maxWidth={"lg"} sx={{ "&&": { ...(sx as any) } }}>
      <Paper
        elevation={0}
        sx={{
          p: 1,
          backgroundColor: (theme) => theme.palette.secondaryBackground.main,
          border: `4px solid #EBEBEA`,
          textAlign: "center",
          "&, & p, & h2": {
            color: (theme) => theme.palette.text.primary,
          },
          "& p span": {
            color: (theme) => theme.palette.primary.main,
          },
          "&&& a, &&& p:last-of-type": {
            color: (theme) => theme.palette.primary.main,
          },
          "&, & p, & h2, && .Typography-root": {
            margin: 0,
            fontSize: "40px",
            lineHeight: "52px",
            ...(paperSx as any),
          },
        }}
      >
        <Typography component="p" variant="h1" mb={0} pb={0}>
          Звоните{" "}
          <ContactDialog component="span">
            {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
          </ContactDialog>
        </Typography>
        <Typography component="h2" variant="h1" mb={0} pb={0}>
          Консультация компьютерного мастера в Балашихе
        </Typography>
        <Typography component="p" variant="h1" mb={0} pb={0}>
          всегда бесплатна!
        </Typography>
      </Paper>
    </Container>
  );
};

export default CallMeForFree;

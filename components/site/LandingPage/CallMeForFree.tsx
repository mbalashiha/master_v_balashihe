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
import ContactDialog from "../contacts/ContactDialog";
import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
type PaperProps = React.ComponentProps<typeof Paper>;
interface Props {
  sx?: SxProps;
  paperSx?: SxProps;
  elevation?: PaperProps["elevation"];
  PaperProps?: PaperProps;
}
export const CallMeForFree = ({
  sx,
  elevation = 0,
  PaperProps,
  paperSx,
}: Props) => {
  return (
    <Container maxWidth={"lg"} sx={{ "&&": { ...(sx as any) } }}>
      <Paper
        elevation={elevation}
        sx={{
          p: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: elevation ? `none` : `2px solid #EBEBEA`,
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
            fontSize: "34px",
            lineHeight: "44px",
            fontWeight: 400,
            color: (theme) => theme.palette.text.primary,
            fontFamily: (theme) => theme.typography.fontFamily,
            ...(paperSx as any),
          },
        }}
        {...PaperProps}
      >
        <Typography component="p" variant="h4" mb={0} pb={0}>
          Звоните{" "}
          <ContactDialog component="span">
            {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
          </ContactDialog>
        </Typography>
        <Typography component="h4" variant="h4" mb={0} pb={0}>
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

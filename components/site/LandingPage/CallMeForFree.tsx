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
import { PhoneLink } from "@components/ui";
import { blueGrey, grey } from "@mui/material/colors";
import React from "react";
interface Props {
  sx?: SxProps;
  containerSx?: SxProps;
}
export const CallMeForFree = ({ sx, containerSx }: Props) => {
  return (
    <Container maxWidth={"lg"} sx={{ "&&&": { p: 0 }, ...containerSx }}>
      <Paper
        elevation={0}
        sx={{
          p: 1,
          backgroundColor: (theme) => theme.palette.secondaryBackground.main,
          border: `4px solid #EBEBEA`,
          textAlign: "center",
          "&, & p, & h2": {
            color: "rgba(0, 0, 0, 0.87)",
          },
          "&&& a, &&& p:last-of-type": {
            color: (theme) => theme.palette.primary.main,
          },
          "&, & p, & h2, && .Typography-root": {
            margin: 0,
            fontSize: "40px",
            lineHeight: "52px",
            ...(sx as any),
          },
        }}
      >
        <Typography component="p" variant="h1" mb={0} pb={0}>
          Звоните <PhoneLink />
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

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
import { NEXT_PUBLIC_CONTACT_PHONE_TEXT } from "@framework/const";
import { useSiteModal } from "@components/site/ModalProvider";
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
  const { toggleModal } = useSiteModal();
  return (
    <Container maxWidth={"lg"} sx={{ "&&": { ...(sx as any) } }}>
      <Paper
        elevation={elevation}
        sx={{
          maxWidth: "99vw",
          overflow: "hidden",
          p: 3,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "#121212"
              : theme.palette.background.paper,
          border: elevation ? `none` : `2px solid #EBEBEA`,
          textAlign: "center",
          "&, & p, & h2": {
            color: (theme) => theme.palette.text.secondary,
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
            color: (theme) => theme.palette.text.secondary,
            fontFamily: `var(--header-font-family)`,
            ...(paperSx as any),
          },
        }}
        {...PaperProps}
      >
        <Typography component="p" mb={0} pb={0}>
          Звоните{" "}
          <Box
            component="span"
            onClick={() => toggleModal("contact list")}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "red",
              },
            }}
          >
            {NEXT_PUBLIC_CONTACT_PHONE_TEXT}
          </Box>
        </Typography>
        <Typography mb={0} pb={0}>
          Консультация компьютерного мастера в Балашихе
        </Typography>
        <Typography mb={0} pb={0}>
          всегда бесплатна!
        </Typography>
      </Paper>
    </Container>
  );
};

export default CallMeForFree;

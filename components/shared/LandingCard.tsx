import {
  Container,
  Grid,
  Card,
  CardMedia,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StartIcon from "@mui/icons-material/Start";
import Link from "next/link";
import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { useSiteModal } from "@components/site/ModalProvider";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  image: any | React.ReactNode | React.ReactNode[];
}
export const LandingCard = ({ children, image }: Props) => {
  const { toggleModal } = useSiteModal();
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card
        elevation={6}
        sx={{
          zIndex: 0,
          minHeight: "240px",
          minWidth: "340px",
          position: "relative",
          "& ul": {
            "&, & li": {
              px: 0,
              py: "1px",
              fontSize: "14px",
              lineHeight: "18px",
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "#303B44",
            },
          },
        }}
      >
        <Stack
          width="100%"
          pl="1.7rem"
          pr="1.2rem"
          py="0.8rem"
          alignItems="flex-end"
          direction="column"
          spacing={1}
        >
          {children}
          <Button
            onClick={() => toggleModal("get discount wizard")}
            sx={{
              padding: (theme) =>
                theme.palette.mode === "dark" ? "14px" : "14px",
              border: "none",
              borderRadius: 1,
              ...standartCssTransition,
              "&": {
                color: (theme) => theme.palette.primary.main,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.85)"
                    : "rgba(255,255,255,0.75)",
              },
              "& svg": {
                background: "none",
              },
              "&:hover": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.90)"
                    : "rgba(255,255,255,0.9)",
              },
              "& .Button-startIcon": {
                pr: 0,
                mr: "3px",
              },
              position: "absolute",
              bottom: "15px",
              right: "14px",
            }}
            startIcon={<StartIcon />}
          >
            Вызвать мастера
          </Button>
        </Stack>
        <CardMedia
          sx={{
            zIndex: -1,
            "& img": {
              zIndex: -1,
              position: "absolute",
              top: "auto",
              right: "auto",
              width: "auto",
              height: "100%",
              bottom: 0,
              left: 0,
            },
          }}
        >
          {image}
        </CardMedia>
      </Card>
    </Grid>
  );
};
export default LandingCard;

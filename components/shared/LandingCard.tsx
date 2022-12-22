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

interface Props {
  children: React.ReactNode | React.ReactNode[];
  image: any | React.ReactNode | React.ReactNode[];
}
export const LandingCard = ({ children, image }: Props) => {
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
              fontSize: "14px",
              lineHeight: "18px",
              color: "#303B44",
            },
          },
        }}
      >
        <Stack
          width="100%"
          px="1.7rem"
          py="0.8rem"
          alignItems="flex-end"
          direction="column"
          spacing={1}
        >
          {children}
          <Button
            sx={{
              padding: 0,
              border: "none",
              borderRadius: 0,
              "&, &:hover, & svg": {
                background: "white",
              },
              "&:hover": {
                color: "black",
              },
              "& .MuiButton-startIcon": {
                pr: 0,
                mr: "3px",
              },
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

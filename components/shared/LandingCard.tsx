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

interface Props {
  children: React.ReactNode | React.ReactNode[];
  image: React.ReactNode | React.ReactNode[];
}
export const LandingCard = ({ children, image }: Props) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card
        elevation={6}
        sx={{
          zIndex: 0,
          minHeight: "220px",
          minWidth: "340px",
          position: "relative",
        }}
      >
        <Stack
          width="100%"
          px="1.7rem"
          py="0.8rem"
          alignItems="flex-end"
          direction="column"
        >
          {children}
          <Button
            sx={{
              padding: 0,
              border: "none",
              background: "transparent",
              "&:hover": {
                background: "transparent",
                color: "black",
              },
            }}
          >
            Вызвать мастера
          </Button>
        </Stack>
        <CardMedia
          sx={{
            zIndex: -1,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {image}
        </CardMedia>
      </Card>
    </Grid>
  );
};
export default LandingCard;

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { GradientOne } from "@components/shared/Gradients";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: React.ReactNode;
  titleIcon?: React.ReactNode;
}
export const GradientCard = ({ children, title, titleIcon }: Props) => {
  return (
    <Card
      elevation={8}
      sx={{
        zIndex: 0,
        minHeight: "600px",
        width: "inherit",
        position: "relative",
        "& ul": {
          "&, & li": {},
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& svg": {},
          "& svg, & svg rect": {
            zIndex: -1,
            width: "100%",
            minWidth: "557px",
            position: "absolute",
            top: 0,
            left: "auto",
            right: "auto",
            bottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <GradientOne />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "75px",
        }}
      >
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box sx={{ width: 1 / 8 }}></Box>
          <Box
            sx={{
              width: { xs: "50px", lg: "62px" },
              "& svg": { width: "41px", height: "41px" },
            }}
          >
            {titleIcon}
          </Box>
          <Box
            fontWeight={700}
            fontSize={{ sm: "16px", md: "22px", xs: "22px" }}
            lineHeight={{ sm: "16px", md: "22px", xs: "22px" }}
            color="white"
            pb="0.35rem"
          >
            {title}
          </Box>
        </Stack>
      </Box>
      <Stack width="100%" px="1.7rem" my="2rem" direction="column" spacing={1}>
        {children}
      </Stack>
    </Card>
  );
};
export default GradientCard;

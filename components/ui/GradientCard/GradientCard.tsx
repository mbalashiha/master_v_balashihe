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
  gradientNumber?: number;
}
export const GradientCard = ({
  children,
  title,
  titleIcon,
  gradientNumber = 1,
}: Props) => {
  return (
    <Card
      elevation={8}
      sx={{
        zIndex: 0,
        minHeight: "200px",
        width: "inherit",
        position: "relative",
        "& ul": {
          "&, & li": {},
        },
        backgroundPosition: "top center",
        backgroundSize: "fit",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('/images/gradients/list-card-head-gradient-${gradientNumber}.svg')`,
      }}
    >
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
      <Stack
        component="ul"
        width="100%"
        px={{ xs: "1.5rem", md: "2.5rem", lg: "3.5rem" }}
        pt="2.5rem"
        pb="1.5rem"
        direction="column"
        spacing={{ xs: "17px", sm: "8px", md: "17px" }}
      >
        {children}
      </Stack>
    </Card>
  );
};
export default GradientCard;

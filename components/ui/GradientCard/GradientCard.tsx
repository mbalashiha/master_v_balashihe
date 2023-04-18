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
        minHeight: { xs: "inherit", sm: "520px", lg: "inherit" },
        width: "inherit",
        position: "relative",
        "& p": {
          margin: 0,
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
        component="div"
        width="100%"
        pl={{ xs: "2.5rem", md: "3rem", lg: "4.5rem" }}
        pr={{ xs: "1.5rem", md: "2.5rem", lg: "3.5rem" }}
        pt="2.5rem"
        pb="1.5rem"
        direction="column"
        spacing={{ xs: "17px", sm: "8px", md: "17px" }}
        sx={{
          "& p": {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            "&::before": {
              display: "inline-block",
              content: `"\\2605"`,
              fontSize: {
                xs: "20px",
                sm: "16px",
                md: "24px",
              },
              lineHeight: {
                xs: "20px",
                sm: "16px",
                md: "20px",
              },
              transform: {
                xs: "translate(-27px,0)",
                sm: "translate(-19px,0)",
                md: "translate(-30px,0)",
              },
              width: 0,
              overflow: "visible",
              color: "orange",
            },
            "&, & strong, & span": {
              fontSize: { xs: "18px", sm: "12px", md: "16px" },
              lineHeight: { xs: "24px", sm: "16px", md: "20px" },
              fontWeight: 600,
              color: (theme) => theme.typography.allVariants.color,
            },
            "& strong": {
              flexGrow: 1,
            },
            "& span": {
              minWidth: { xs: "90px", sm: "80px" },
              textAlign: "right",
            },
            "& a": {
              color: "inherit",
              textDecoration: "underline",
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
                textDecoration: "none",
              },
            },
          },
        }}
      >
        {children}
      </Stack>
    </Card>
  );
};
export default GradientCard;

import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Fab,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Blog } from "@common/types/cms";

interface Props {
  navigation: Blog.BlogArticleNavigation;
}

export default function NavigationButtons({ navigation }: Props) {
  return (
    <Grid
      component="nav"
      container
      spacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        mb: { xs: 3, sm: 1 },
        "& a": {
          padding: 0,
          width: "100%",
          textOverflow: "ellipsis",
          display: "block",
          "&, & > span": {
            borderRadius: "2rem",
            border: "none",
            background: (theme) => theme.palette.background.paper,
            borderColor: (theme) => theme.palette.background.paper,
          },
          "&:hover": {
            "& .SvgIcon-root, & .ButtonBase-root, & *, & > *": {
              textDecoration: "none",
              color: "#ff7777",
            },
            "&, & > span": {
              background: (theme) => theme.palette.primary.main,
              borderColor: (theme) => theme.palette.primary.main,
            },
          },
          "& > span": {
            height: { xs: "220px", md: "124px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "none",
            boxSizing: "border-box",
            overflow: "hidden",
            border: "2px solid rgb(235, 235, 234)",
            "& .SvgIcon-root": {
              width: { xs: "30px", md: "75px" },
              height: { xs: "30px", md: "75px" },
              color: "rgb(235, 235, 234)",
            },
            p: 0,
            "& h6": {
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "left",
            },
          },
        },
      }}
    >
      <Grid component={"strong"} item xs={6}>
        {navigation?.prev?.url && (
          <Link href={navigation.prev.url}>
            <Button component="span">
              <Stack
                component="span"
                width={"100%"}
                direction={"row"}
                alignItems="center"
                justifyContent={"flex-start"}
              >
                <ArrowBackIosRoundedIcon />
                <Box component="h6" sx={{ mr: 1 }}>
                  {navigation.prev.title}
                </Box>
              </Stack>
            </Button>
          </Link>
        )}
      </Grid>
      <Grid component={"strong"} item xs={6}>
        {navigation?.next?.url && (
          <Link href={navigation.next.url}>
            <Button component="span">
              <Stack
                component="span"
                width={"100%"}
                direction={"row"}
                alignItems="center"
                justifyContent={"flex-end"}
              >
                <Box component="h6" sx={{ ml: 1 }}>
                  {navigation.next.title}
                </Box>
                <ArrowForwardIosRoundedIcon />
              </Stack>
            </Button>
          </Link>
        )}
      </Grid>
    </Grid>
  );
}

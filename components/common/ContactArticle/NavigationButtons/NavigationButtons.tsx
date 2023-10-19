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
import { standartCssTransition } from "@components/ui/theme/mui-theme";

interface Props {
  navigation: Blog.BlogArticleNavigation;
}

export default function NavigationButtons({ navigation }: Props) {
  return (
    <div itemScope itemType="https://schema.org/SiteNavigationElement">
      <Grid
        component="ul"
        container
        spacing={{ xs: 0, md: 1, lg: 2 }}
        itemScope
        itemType="https://schema.org/ItemList"
        sx={{
          listStyleType: "none",
          m: 0,
          p: 0,
          mb: "14px",
          "& li": {
            maxWidth: "49vw",
            overflow: "hidden",
          },
          "& a > *": {
            border: "none",
            borderRadius: "6px",
            padding: 0,
            textTransform: "none",
            "&:hover": {
              background: "none",
              boxShadow: "none",
              color: (theme) => theme.palette.primary.main,
            },
          },
          "& *[itemProp='name']": {
            margin: "10px",
            fontSize: "17px",
            lineHeight: "24px",
            maxHeight: "48px",
            maxWidth: "380px",
            overflow: "hidden",
          },
          "&&& a": {
            "& svg": {
              width: "50px",
              height: "50px",
              background: "rgba(1,1,1,1)",
              padding: "10px",
              borderRadius: "6px",
              color: "white",
              fill: "white",
              ...standartCssTransition,
            },
            "& *[itemProp='name']": {
              color: "rgba(1,1,1,1)",
            },
            "&:hover": {
              background: "none",
              boxShadow: "none",
              color: (theme) => theme.palette.primary.main,
              "& svg": {
                background: (theme) => theme.palette.primary.main,
              },
              "& *[itemProp='name']": {
                color: (theme) => theme.palette.primary.main,
              },
            },
          },
        }}
      >
        <Grid
          component={"li"}
          item
          xs={6}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ItemList"
          sx={{
            "&, & span, & *": {
              textAlign: "left",
            },
          }}
        >
          {navigation?.prev?.url && (
            <Link itemProp="url" href={navigation.prev.url}>
              <Button component="span">
                <ArrowBackIosRoundedIcon />
                <Box itemProp="name" component="span" sx={{ mr: 1 }}>
                  {navigation.prev.title}
                </Box>
              </Button>
            </Link>
          )}
        </Grid>
        <Grid
          component={"li"}
          item
          xs={6}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ItemList"
          sx={{
            "&, & span, & *": {
              textAlign: "right",
            },
          }}
        >
          {navigation?.next?.url && (
            <Link itemProp="url" href={navigation.next.url}>
              <Button component="span">
                <Box itemProp="name" component="span" sx={{ ml: 1 }}>
                  {navigation.next.title}
                </Box>
                <ArrowForwardIosRoundedIcon />
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

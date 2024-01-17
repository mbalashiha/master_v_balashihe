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
          "&&& a": {
            "& svg": {
              width: "auto",
              height: "50px",
              py: { xs: "1px", sm: "5px", md: "8px" },
              borderRadius: "9px",
              color: (theme) => theme.palette.text.secondary,
              fill: (theme) => theme.palette.text.secondary,
            },
            "& *[itemProp='name']": {
              margin: "10px",
              fontSize: "17px",
              lineHeight: "24px",
              maxHeight: 24 * 2 + "px",
              maxWidth: "380px",
              overflow: "hidden",
              display: "-webkit-box",
              leftineClamp: "2",
              boxOrient: "vertical",
              textOverflow: "ellipsis",
              color: (theme) => theme.palette.text.secondary,
              fontWeight: 400,
              fontFamily: `var(--landing-font-family)`,
            },
            "&:hover": {
              background: "none",
              boxShadow: "none",
              color: (theme) => theme.palette.primary.main,
              "& svg": {
                fill: (theme) => theme.palette.primary.main,
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

import {
  TextField,
  Button,
  IconButton,
  Stack,
  Paper,
  SxProps,
  Divider,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import { useRouter } from "next/router";
import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { useMemo } from "react";
import { getCanonicalUrl } from "@framework/utils/normalize";

interface Props {
  search?: string;
  sx?: SxProps;
  onSubmit?: ({ search }: { search: string }) => void;
  navbarSearch?: boolean;
}

export default function Search({ search, sx, onSubmit, navbarSearch }: Props) {
  const router = useRouter();
  const isSearchPage = useMemo(
    () => router.pathname === "/search/[search]",
    [router.pathname]
  );
  const routerSearchQuery = useMemo(
    () =>
      router.query.search
        ? Array.isArray(router.query.search)
          ? decodeURIComponent(router.query.search[0])
          : decodeURIComponent(router.query.search)
        : "",
    [router.query.search]
  );
  const [searchString, setSearchString] = React.useState(
    search || routerSearchQuery || ""
  );
  const clearValue = () => setSearchString("");
  const hasSearchString = Boolean(searchString && searchString.length > 1);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (hasSearchString) {
      if (onSubmit) {
        onSubmit({ search: searchString });
      } else {
        router.push({
          pathname: `/search/[search]`,
          query: { search: encodeURIComponent(searchString) },
        });
      }
    }
  };
  const themeGreyColor = "rgba(25, 23, 21, 0.16)";
  return (
    <>
      {navbarSearch && isSearchPage ? (
        <Typography component="h1" variant="h1">
          Поиск по сайту
        </Typography>
      ) : (
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            display: "flex",
            position: "relative",
            maxWidth: "1190px",
            "& form": {
              width: "100%",
              display: "flex",
            },
            ...sx,
          }}
          itemScope
          itemType="https://schema.org/WebSite"
        >
          <meta itemProp="url" content={getCanonicalUrl("/")} />
          <form
            role="search"
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/SearchAction"
            method="get"
            onSubmit={handleSubmit}
          >
            <meta
              itemProp="target"
              content={getCanonicalUrl("/search/{search_term_string}")}
            />
            <TextField
              sx={{
                width: "100%",
                "& input": {},
                "& .InputLabel-shrink": {
                  display: "none",
                },
                "& .FormLabel-root": {
                  paddingLeft: "10px",
                },
                "& .InputBase-root": {
                  height: "46px",
                  border: `2px solid ${themeGreyColor}`,
                  borderRadius: 1,
                  padding: "5px 0px 5px 15px",
                  "&.Mui-focused": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                  "& .ButtonBase-root": {
                    "& .SvgIcon-root": {
                      color: grey[500],
                    },
                    "&:disabled": {
                      "&, & .SvgIcon-root": {
                        color: grey[500],
                      },
                    },
                  },
                },
              }}
              variant="filled"
              placeholder="Поиск по сайту"
              value={searchString}
              name="search_term_string"
              type="search"
              required
              inputProps={{
                itemProp: "query-input",
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <>
                    <IconButton
                      sx={{
                        visibility: searchString ? "visible" : "hidden",
                        "& .SvgIcon-root": {
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={clearValue}
                    >
                      <ClearIcon />
                    </IconButton>
                    <Divider
                      orientation="vertical"
                      sx={{
                        visibility: searchString ? "visible" : "hidden",
                      }}
                    />
                    <Button
                      type="submit"
                      sx={{
                        height: "46px",
                        minWidth: "46px",
                        width: "auto",
                        background: "transparent",
                        py: 0,
                        px: "10px",
                        fontSize: "20px",
                        fontWeight: 400,
                        boxShadow: "none",
                        border: "none",
                        "&:after": {
                          content: `"\\e8b6"`,
                          fontFamily: "Material Icons",
                          fontWeight: 400,
                          fontSize: "34px",
                          lineHeight: "34px",
                        },
                        "&:hover": {
                          background: "transparent",
                          border: "none",
                          color: (theme) => theme.palette.text.primary,
                          boxShadow: "none",
                        },
                        "&:disabled": {
                          background: "transparent",
                        },
                        "&, &:after": {
                          color: (theme) =>
                            hasSearchString
                              ? theme.palette.primary.main
                              : "#898994",
                        },
                      }}
                    ></Button>
                  </>
                ),
              }}
              onChange={(event) => {
                setSearchString(event.currentTarget.value);
              }}
            />
          </form>
        </Paper>
      )}
    </>
  );
}

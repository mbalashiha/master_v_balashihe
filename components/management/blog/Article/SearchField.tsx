import { grey } from "@mui/material/colors";
import {
  TextField,
  Button,
  IconButton,
  Stack,
  Paper,
  SxProps,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import { useRouter } from "next/router";
import { useSearchProvider } from "./SearchProvider";
import useArticleSearch from "@framework/management/blog/use-articles-search";
import { standartCssTransition } from "@components/ui/theme/mui-theme";

interface Props {
  sx?: SxProps;
}

export default function SearchField({ sx }: Props) {
  const { search: providedSearch, setSearchQuery } = useSearchProvider();
  const searchArticles = useArticleSearch();
  const [searchString, setSearchString] = React.useState(providedSearch || "");
  const clearValue = () => {
    setSearchString("");
    searchArticles({ search: "" });
  };
  const hasSearchString = Boolean(searchString && searchString.length > 1);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (searchString !== providedSearch) {
      searchArticles({ search: searchString });
    }
  };
  const themeGreyColor = "rgba(25, 23, 21, 0.16)";
  return (
    <Paper
      elevation={0}
      sx={{
        ...sx,
      }}
    >
      <form onSubmit={handleSubmit}>
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
              "&.-focused": {
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
                  disabled={!hasSearchString}
                  type="submit"
                  sx={{
                    height: "46px",
                    minWidth: "46px",
                    width: "auto",
                    background: "transparent",
                    color: themeGreyColor,
                    ...standartCssTransition,
                    pl: "10px",
                    pr: "18px",
                    fontSize: "20px",
                    fontWeight: 400,
                    boxShadow: "none",
                    border: "none",
                    "&:hover": {
                      background: "transparent",
                      border: "none",
                      color: (theme) => theme.palette.text.primary,
                      boxShadow: "none",
                      "&, & svg, & svg path": {
                        ...standartCssTransition,
                        color: grey[800],
                      },
                    },
                    "&:disabled": {
                      background: "transparent",
                    },
                    "& .SvgIcon-root": {
                      transform: "scale(1.3)",
                      color: grey[500],
                    },
                  }}
                >
                  <SearchIcon />
                </Button>
              </>
            ),
          }}
          onChange={(event) => {
            setSearchString(event.currentTarget.value);
          }}
        />
      </form>
    </Paper>
  );
}

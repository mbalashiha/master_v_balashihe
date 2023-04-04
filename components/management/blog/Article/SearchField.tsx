import { grey } from "@mui/material/colors";
import {
  TextField,
  Button,
  IconButton,
  Stack,
  Paper,
  SxProps,
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
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        position: "relative",
        "& form": {
          width: "100%",
          display: "flex",
        },
        ...sx,
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            width: "100%",
            "& input": {},
            "& .MuiInputLabel-shrink": {
              display: "none",
            },
            "& .MuiFormLabel-root": {
              paddingLeft: "10px",
            },
            "& .Mui-focused .MuiIconButton-root": { color: "primary.main" },
            "& .MuiInputBase-root": {
              height: "48px",
              border: "2px solid transparent",
              borderRadius: 1,
              padding: "5px 0px 5px 15px",
              "&.Mui-focused": {
                borderColor: (theme) => theme.palette.primary.main,
              },
              "& .MuiSvgIcon-root": {
                transform: "scale(1.3)",
              },
            },
          }}
          variant="filled"
          placeholder="Поиск по статьям"
          value={searchString}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <>
                <IconButton
                  sx={{ visibility: searchString ? "visible" : "hidden" }}
                  onClick={clearValue}
                >
                  <ClearIcon />
                </IconButton>
                <Button
                  disabled={!hasSearchString}
                  type="submit"
                  sx={{
                    width: "auto",
                    background: "transparent",
                    color: grey[600],
                    ...standartCssTransition,
                    height: "46px",
                    px: "23px",
                    borderRadius: 1,
                    mr: "-1px",
                    border: "none",
                    fontSize: "20px",
                    fontWeight: 400,
                    "&:hover": {
                      background: "transparent",
                      color: (theme) => theme.palette.primary.main,
                    },
                    "&:disabled": {
                      color: grey[600],
                    },
                  }}
                >
                  {hasSearchString ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={"8px"}
                    >
                      <SearchIcon />
                      <span>Найти</span>
                    </Stack>
                  ) : (
                    <SearchIcon />
                  )}
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

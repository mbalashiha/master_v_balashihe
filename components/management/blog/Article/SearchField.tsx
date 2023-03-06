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
              height: "38px",
              border: "2px solid transparent",
              borderRadius: 1,
              padding: "5px",
              paddingLeft: "20px",
              paddingRight: "63px",
              "&.Mui-focused": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          }}
          variant="filled"
          placeholder="Поиск по статьям"
          value={searchString}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <IconButton
                sx={{ visibility: searchString ? "visible" : "hidden" }}
                onClick={clearValue}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
          onChange={(event) => {
            setSearchString(event.currentTarget.value);
          }}
        />
        <Button
          disabled={searchString === providedSearch}
          type="submit"
          sx={{
            width: "auto",
            height: "38px",
            background: "black",
            color: "white",
            position: "absolute",
            right: 0,
            transition: "all ease-in-out .2s",
            px: "6px",
            borderRadius: 1,
            border: "none",
            "&:hover": {
              background: (theme) => theme.palette.primary.main,
            },
            "&:disabled": {
              color: "white",
            },
          }}
        >
          <SearchIcon />
        </Button>
      </form>
    </Paper>
  );
}

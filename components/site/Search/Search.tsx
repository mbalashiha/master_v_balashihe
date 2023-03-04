import { TextField, Button, IconButton, Stack, Paper, SxProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import { useRouter } from "next/router";

interface Props {
  search?: string;
  sx?: SxProps;
  onSubmit?: ({ search }: { search: string }) => void;
}

export default function Search({ search, sx, onSubmit }: Props) {
  const router = useRouter();
  const [searchString, setSearchString] = React.useState(search || "");
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
              padding: "5px",
              paddingLeft: "20px",
              paddingRight: hasSearchString ? "109px" : "63px",
              "&.Mui-focused": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
          }}
          variant="filled"
          placeholder="Поиск по сайту"
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
            setSearchString(event.currentTarget.value.trim());
          }}
        />
        <Button
          disabled={!hasSearchString}
          type="submit"
          sx={{
            width: "auto",
            height: "48px",
            background: "black",
            color: "white",
            position: "absolute",
            right: 0,
            transition: "all ease-in-out .2s",
            px: "16px",
            borderRadius: 1,
            border: "none",
            "&:hover": {
              background: (theme) => theme.palette.primary.main,
            },
            "&:disabled": {
              color: "white",
            },
          }}
          startIcon={hasSearchString && <SearchIcon />}
        >
          {hasSearchString ? <span>Найти</span> : <SearchIcon />}
        </Button>
      </form>
    </Paper>
  );
}

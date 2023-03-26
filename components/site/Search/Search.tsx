import {
  TextField,
  Button,
  IconButton,
  Stack,
  Paper,
  SxProps,
} from "@mui/material";
import { grey } from "@mui/material/colors";
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
              padding: "5px 0px 5px 15px",
              "&.Mui-focused": {
                borderColor: (theme) => theme.palette.primary.main,
              },
              "& .MuiSvgIcon-root": {
                transform: "scale(1.7)",
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
                    transition: "all ease-in-out .2s",
                    height: "46px",
                    px: hasSearchString ? "19px" : "26px",
                    borderRadius: 1,
                    mr: "-1px",
                    border: "none",
                    fontSize: "22px",
                    fontWeight: 400,
                    "&:hover": {
                      background: (theme) => theme.palette.primary.main,
                      color: "white",
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

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
import { standartCssTransition } from "@components/ui/theme/mui-theme";

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
  const themeGreyColor = "rgba(25, 23, 21, 0.16)";
  return (
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
            "& .MuiInputBase-root": {
              height: "46px",
              border: `2px solid ${themeGreyColor}`,
              borderRadius: 1,
              padding: "5px 0px 5px 15px",
              "&.Mui-focused": {
                borderColor: (theme) => theme.palette.primary.main,
              },
              "& .MuiButtonBase-root": {
                "& .MuiSvgIcon-root": {
                  transform: "scale(1.3)",
                  color: grey[600],
                },
                "&:disabled": {
                  "& .MuiSvgIcon-root": {
                    color: grey[400],
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
                  sx={{ visibility: searchString ? "visible" : "hidden" }}
                  onClick={clearValue}
                >
                  <ClearIcon />
                </IconButton>
                <Button
                  disabled={!hasSearchString}
                  type="submit"
                  sx={{
                    background: "transparent",
                    color: themeGreyColor,
                    ...standartCssTransition,
                    height: "46px",
                    width: "46px",
                    px: "26px",
                    borderRadius: 1,
                    mr: "-1px",
                    border: "none",
                    fontSize: "20px",
                    fontWeight: 400,
                    "&:hover": {
                      background: "transparent",
                      color: (theme) => theme.palette.text.primary,
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

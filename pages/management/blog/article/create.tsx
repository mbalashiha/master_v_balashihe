import { MainActionButton } from "@components/ui";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { ErrorsProvider } from "@components/ui/contexts/use-errors-context";
import Typography from "@mui/material/Typography";
import { ManagementLayout } from "@components/management";
import { useSnackbar } from "notistack";
import React from "react";
import { ArticleBodyEditor } from "@components/management/blog";

export default function ArticleCreatePage() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
                height: "1080px",
                width: "100%",
                border: "none",
            }}
          >
            <ArticleBodyEditor />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
ArticleCreatePage.Layout = ManagementLayout;

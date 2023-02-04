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

export default function ArticleCreatePage() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              "& > iframe": {
                height: "1080px",
                width: "100%",
                border: "none",
              },
            }}
          >
            <iframe
              name="tinymce-iframe"
              title="TinyMCE editor"
              height={800}
              width={800}
              src="/management/blog/article/editor/tinymce-iframe"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
ArticleCreatePage.Layout = ManagementLayout;

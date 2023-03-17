import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export default function ImagePanel() {
  const uploaderRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={uploaderRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={async (event) => {
          const input = event.currentTarget;
          const files =
            input && input.files && input.files.length ? input.files : [];
        }}
      />
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: { xs: 1, md: 2 },
              width: "100%",
              background: "grey",
              cursor: "pointer",
            }}
            onClick={() => uploaderRef.current?.click()}
          >
            <Box
              width="auto"
              height="auto"
              minHeight="308px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px dashed transparent"
              borderRadius={1}
            >
              <AddAPhotoRoundedIcon
                sx={{ width: "49%", height: "49%", color: blueGrey["200"] }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Paper
            sx={{ p: { xs: 1, md: 2 }, background: "black", cursor: "pointer" }}
            onClick={() => uploaderRef.current?.click()}
          >
            <Box
              width="100%"
              minHeight="308px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px dashed white"
              borderRadius={1}
            >
              <Box
                sx={{ color: "white" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>
                  <CloudUploadIcon sx={{ fontSize: "100px" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    component="h6"
                    color="grey.400"
                    fontSize={{ xs: "30px", md: "20px", lg: "35px" }}
                  >
                    Загрузить изображение
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { Grid, Paper, Typography, Box, Button, Stack } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { useField } from "formik";
import Image from "next/image";
import { CMS } from "@common/types";
import { useImageReceived } from "./hooks/use-image-received";
import { useRefFormik } from "@components/ui";
import CloseIcon from "@mui/icons-material/Close";

export default function ImagesTabPanel() {
  const inputs = [useImageReceived("image"), useImageReceived("secondImage")];
  return (
    <Stack spacing={2} width="100%">
      {inputs.map((imageInput) => (
        <Grid
          width="100%"
          key={imageInput.imageFieldName}
          container
          spacing={0}
          sx={{ "& img": { borderRadius: 1 } }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            sx={{
              "& img": {
                width: "97%",
                height: "auto",
              },
            }}
          >
            <Box
              width="100%"
              sx={{
                pl: { xs: 0, sm: "5px" },
              }}
            >
              <input
                ref={imageInput.uploaderRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={imageInput.onChange}
              />
              {imageInput.image && imageInput.image.url ? (
                <Image
                  src={imageInput.image.url}
                  alt={imageInput.image.alt}
                  width={500}
                  height={500}
                />
              ) : (
                <Paper
                  sx={{
                    p: { xs: 1, md: 2 },
                    width: "100%",
                    background: "grey",
                    cursor: "pointer",
                  }}
                  onClick={() => imageInput.uploaderRef.current?.click()}
                >
                  <Box
                    width="auto"
                    height="auto"
                    minHeight="208px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="2px dashed transparent"
                    borderRadius={1}
                  >
                    <AddAPhotoRoundedIcon
                      sx={{
                        width: "49%",
                        height: "49%",
                        color: blueGrey["200"],
                      }}
                    />
                  </Box>
                </Paper>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={8}>
            <Stack spacing={1} width="100%">
              <Paper
                sx={{
                  p: { xs: 1, md: 2 },
                  background: "black",
                  cursor: "pointer",
                }}
                onClick={() => imageInput.uploaderRef.current?.click()}
              >
                <Box
                  width="100%"
                  minHeight="208px"
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
                        fontSize={{ xs: "20px", md: "20px", lg: "35px" }}
                      >
                        Загрузить изображение
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
              <>
                {imageInput.imageId && (
                  <Button
                    sx={{
                      width: "100%",
                      height: "48px",
                      background: grey[900],
                      color: "primary.main",
                      fontWeight: "400",
                      fontSize: { xs: "16px", md: "20px" },
                      textTransform: "uppercase",
                      position: "relative",
                      px: "3.4rem",
                      "& .Button-endIcon": {
                        position: "absolute",
                        right: "1.5rem",
                        transform: "scale(2)",
                      },
                    }}
                    onClick={() => imageInput.setImageToNull()}
                    endIcon={<CloseIcon />}
                  >
                    Удалить изображение
                  </Button>
                )}
              </>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}

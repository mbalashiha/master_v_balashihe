import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
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
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            sx={{
              px: { xs: 0, sm: "5px" },
            }}
          >
            <Box
              width="100%"
              height="100%"
              sx={{
                "& img": {
                  borderRadius: 1,
                  width: { xs: "100%", sm: "97%" },
                  height: "auto",
                },
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
                    height: "100%",
                    background: "grey",
                    cursor: "pointer",
                  }}
                  onClick={() => imageInput.uploaderRef.current?.click()}
                >
                  <Box
                    minHeight="208px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={1}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
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
          <Grid item xs={12} sm={6} md={6} lg={8} sx={{ pt: { md: 2 } }}>
            <Stack spacing={1} width="100%">
              <Paper
                sx={{
                  p: { xs: 1, md: 2 },
                  background: "black",
                  cursor: "pointer",
                }}
                onClick={() => imageInput.uploaderRef.current?.click()}
              >
                <Stack
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection={"column"}
                  border="2px dashed white"
                  p={1}
                  borderRadius={1}
                  spacing={0}
                  sx={{ color: "white" }}
                >
                  <Typography color="white" component={"div"} fontSize={"20px"}>
                    {imageInput.imageFieldName === "image"
                      ? "Основное изображение в каталоге"
                      : imageInput.imageFieldName === "secondImage"
                      ? "Второе изображение - описание (необязательно)"
                      : null}
                  </Typography>
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
                </Stack>
              </Paper>
              <Box width="100%">
                <TextField
                  sx={{ width: "100%" }}
                  variant="standard"
                  label="Подпись"
                  placeholder="Укажите подпись изображения"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...imageInput.titleField}
                />
              </Box>
              <Box>
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
                        transitionProperty: "none",
                        position: "absolute",
                        right: "1.5rem",
                        transform: "scale(2)",
                      },
                      "& > *, & svg": {
                        transitionProperty: "none",
                      },
                    }}
                    onClick={() => imageInput.setImageToNull()}
                    endIcon={<CloseIcon />}
                  >
                    Удалить изображение
                  </Button>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}

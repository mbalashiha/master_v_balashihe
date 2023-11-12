import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  TextField,
  Container,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { Formik, useField, Form } from "formik";
import Image from "next/image";
import { Dialog, DialogActions, DialogContentText } from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useFormikContext } from "formik";
import { useState } from "react";
import { Blog } from "@common/types/cms";
import CloseIcon from "@mui/icons-material/Close";
import { useEditorContext } from "./ProviderTinyMCE";
import useImageUpload from "@framework/management/image/use-image-upload";
import { getInputFileIdName } from "@common/utils/get-file-id-name";
import { normalizeImage } from "@framework/utils/normalize";
import { CMS } from "@common/types";

interface IUProps {}
function ImageUpload({}: IUProps) {
  const uploaderRef = useRef<HTMLInputElement>();
  const uploadImage = useImageUpload();
  const [titleField] = useField("title");
  const [imgSrcField] = useField("imgSrc");
  const [uploadedImageField] = useField<CMS.Image>("uploadedImage");
  const imgSrc = imgSrcField.value;
  const [isUploading, setIsUploading] = useState(false);
  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    try {
      const input = event.target;
      const files =
        input && input.files && input.files.length ? input.files : [];
      const file = files[0];
      if (file) {
        const { id, fieldname } = getInputFileIdName(file);
        const result = await uploadImage({
          images: [{ file, id, fieldname }],
        });
        const { images, success } = result;
        let image = images && images[0];
        if (image && image.imageId && image.imgSrc) {
          const { imageId, imgSrc, height, width } = image;
          const nImage = normalizeImage({
            imageId,
            imgSrc,
            height,
            width,
          });
          imgSrcField.onChange({
            target: { name: imgSrcField.name, value: nImage.imgSrc },
          });
          uploadedImageField.onChange({
            target: { name: uploadedImageField.name, value: nImage },
          });
        } else {
          alert("Could not upload image: " + fieldname);
        }
      }
    } catch (e: any) {
      alert(e.message || e.stack || e);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={0} sx={{}}>
        <Grid item xs={12} sm={6} md={6} lg={4} sx={{}}>
          <Box
            width="100%"
            height="100%"
            sx={{
              pl: { xs: 0, sm: "5px" },
              maxHeight: { xs: "37vh", sm: "80vh" },
              overflowY: "auto",
              "& img, & > *": {
                width: "97%",
                height: "auto",
                borderRadius: 1,
              },
            }}
          >
            <input
              ref={uploaderRef as React.LegacyRef<HTMLInputElement>}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              disabled={isUploading}
              onChange={isUploading ? () => {} : onInputChange}
              multiple={false}
            />
            {imgSrc ? (
              <Image src={imgSrc} alt={imgSrc} width={500} height={500} />
            ) : (
              <Paper
                sx={{
                  p: { xs: 1, md: 2 },
                  width: "95%",
                  background: "grey",
                  cursor: "pointer",
                }}
                onClick={() => uploaderRef.current?.click()}
              >
                <Box
                  width="auto"
                  height="100%"
                  minHeight={{ xs: "200px", sm: "330px" }}
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
            <Box>
              <Button
                disabled={Boolean(!imgSrc)}
                sx={{
                  width: "100%",
                  background: grey[900],
                  color: "white",
                  fontWeight: 400,
                  fontSize: { xs: "16px", md: "20px" },
                  lineHeight: { xs: "22px", md: "30px" },
                  textTransform: "uppercase",
                  position: "relative",
                  px: "3.4rem",
                  height: "auto",
                  "& .Button-endIcon": {
                    transitionProperty: "none",
                    "& svg": {
                      transitionProperty: "none",
                      fontSize: "26px",
                    },
                    position: "absolute",
                    right: "1.5rem",
                    p: 1,
                  },
                  "&:hover": {
                    color: "white",
                    background: "primary.main",
                  },
                }}
                onClick={() => {
                  imgSrcField.onChange({
                    target: { name: imgSrcField.name, value: null },
                  });
                  uploadedImageField.onChange({
                    target: { name: uploadedImageField.name, value: null },
                  });
                }}
                endIcon={<DeleteOutlinedIcon />}
              >
                Удалить изображение
              </Button>
            </Box>
            {!imgSrc && (
              <Stack
                width="100%"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                  justifyContent: "flex-end",
                  height: "35px",
                  flexWrap: "wrap",
                  "& > *": {
                    display: "block",
                    mx: 1,
                    my: 0,
                    minHeight: "35px",
                  },
                }}
              >
                <Box sx={{ color: "primary.main", fontSize: "25px" }}>
                  Изображение удалено
                </Box>
                <Button type="submit">Применить</Button>
              </Stack>
            )}
            <Paper
              sx={{
                p: { xs: 1, md: 2 },
                background: "black",
                cursor: "pointer",
              }}
              onClick={
                isUploading ? () => {} : () => uploaderRef.current?.click()
              }
            >
              <Box
                width="100%"
                display="flex"
                flexDirection={"column"}
                alignItems="center"
                justifyContent="center"
                border="2px dashed white"
                borderRadius={1}
                p={1}
                color="white"
              >
                {imgSrc && (
                  <Typography
                    alignSelf={"flex-start"}
                    px={2}
                    py={0}
                    color="grey.400"
                  >
                    {uploadedImageField.value ? "Новое изображение:" : "Путь:"}{" "}
                    <Box
                      component="span"
                      color={
                        uploadedImageField.value ? "lightgreen" : "lightblue"
                      }
                    >
                      {imgSrc}
                    </Box>
                  </Typography>
                )}
                <Box
                  sx={{ color: "white" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  {isUploading ? null : (
                    <Box>
                      <CloudUploadIcon sx={{ fontSize: "100px" }} />
                    </Box>
                  )}
                  <Box>
                    <Typography
                      variant="h4"
                      component="div"
                      color="grey.400"
                      fontSize={{ xs: "20px", md: "20px", lg: "35px" }}
                    >
                      {isUploading ? "Загружаем..." : "Загрузить изображение"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
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
                {...titleField}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
interface Props {
  close: () => void;
  modalImg: HTMLImageElement | null;
}
function SubmitButton() {
  const { dirty } = useFormikContext();
  return (
    <Button sx={{}} disabled={!dirty} type="submit">
      Сохранить
    </Button>
  );
}
export default function ImageUploadModal({
  modalImg: imgElement,
  close,
}: Props) {
  const { editorRef } = useEditorContext();
  const title =
    imgElement?.parentElement?.querySelector("[data-image-title]")
      ?.textContent || "";
  return (
    <>
      {imgElement && (
        <Dialog
          open={Boolean(imgElement)}
          onClose={close}
          fullWidth={true}
          maxWidth="lg"
          sx={{
            "& .DialogActions-root": {
              justifyContent: "space-between",
            },
          }}
        >
          <Formik
            initialValues={{
              imgSrc:
                editorRef.current?.editor?.dom?.getAttrib(imgElement, "src") || null,
              uploadedImage: null as null | CMS.Image,
              title,
            }}
            onSubmit={(values, context) => {
              const { imgSrc } = values;
              const editor = editorRef.current?.editor;
              if (editor) {
                editor.undoManager.add();
                editor.dom.setAttrib(imgElement, "src", imgSrc || null);
                if (values.uploadedImage) {
                  editor.dom.setAttribs(imgElement, {
                    "data-original-width":
                      values.uploadedImage.width.toString(),
                    "data-original-height":
                      values.uploadedImage.height.toString(),
                  });
                }
                let parent = imgElement.parentElement;
                if (
                  !parent ||
                  !Boolean(editor.dom.getAttrib(parent, "data-image-container"))
                ) {
                  parent = imgElement;
                }
                const newContainer = editor.dom.create(
                  "div",
                  {
                    "data-image-container": "1",
                    class: "data-image-container",
                    style: "text-align: center;",
                  },
                  editor.dom.getOuterHTML(imgElement)
                );
                parent.parentNode?.replaceChild(newContainer, parent);
                newContainer.appendChild(
                  editor.dom.create(
                    "div",
                    { "data-image-title": "1", class: "data-image-title" },
                    values.title || ""
                  )
                );
                if (!imgSrc) {
                  editor.dom.remove(newContainer);
                }
                editor.undoManager.add();
                editor.fire("change");
              }
              close();
            }}
          >
            <Form>
              <DialogContentText sx={{ p: 1 }}>
                <ImageUpload />
              </DialogContentText>
              <DialogActions
                sx={{
                  width: "100%",
                  "& button": {
                    borderRadius: 1,
                    padding: "16px",
                  },
                }}
              >
                <Button sx={{ background: "grey" }} onClick={() => close()}>
                  Отмена
                </Button>
                <SubmitButton />
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      )}
    </>
  );
}

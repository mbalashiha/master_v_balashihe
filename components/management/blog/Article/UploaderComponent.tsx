import React, { useRef } from "react";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useField } from "formik";
import Image from "next/image";
import { CMS } from "@common/types";
import { useImageReceived } from "./hooks/use-image-received";
import { useTabs } from "@components/common/Tabs/TabsProvider";
type PaperProps = React.ComponentProps<typeof Paper>;

export default function UploaderComponent({ sx, ...rest }: PaperProps) {
  const { value, handleChange, setTabNumber } = useTabs();
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [imageField] = useField<CMS.Image>("image");
  const image = imageField.value;
  const inputOnChange = useImageReceived();
  return (
    <>
      {!(image && image.url) && (
        <input
          ref={uploaderRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={inputOnChange}
        />
      )}

      {image && image.url ? (
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          style={{ opacity: "0", maxHeight: "189px" }}
          className={"mainImage"}
          onLoad={(event: any) => {
            const target = (event.target ||
              event.currentTarget) as HTMLImageElement;
            target.setAttribute("width", "auto");
            target.setAttribute("height", "auto");
            target.style.width = "100%";
            target.style.height = "100%";
            target.style.opacity = "1";
            target.style.maxHeight = "";
          }}
          onClick={() => setTabNumber(1)}
        />
      ) : (
        <Paper
          elevation={0}
          className={"mainImage"}
          sx={{
            width: "100%",
            height: "100%",
            background: "grey",
            cursor: "pointer",
            minHeight: "189px",
            minWidth: "189px",
            ...sx,
          }}
          onClick={() => uploaderRef.current?.click()}
          {...rest}
        >
          <Box
            width="100%"
            height="100%"
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
      )}
    </>
  );
}

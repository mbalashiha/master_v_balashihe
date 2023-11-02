import React, { useCallback, useRef } from "react";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useField } from "formik";
import Image from "next/image";
import { CMS } from "@common/types";
import { useImageReceived } from "./hooks/use-image-received";
import { useTabs } from "@components/common/Tabs/TabsProvider";
type PaperProps = React.ComponentProps<typeof Paper>;

export default function FirstTabImageUploader({ sx, ...rest }: PaperProps) {
  const { value, handleChange, setTabNumber } = useTabs();
  const goToImagesTab = useCallback(() => setTabNumber(3), [setTabNumber]);
  const imageInput = useImageReceived("image");
  return (
    <Box
      width="100%"
      sx={{
        width: "100%",
        height: "auto",
        marginLeft: { sm: "-5px", md: "-9px" },
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {!(imageInput.image && imageInput.image.url) && (
        <input
          ref={imageInput.uploaderRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={imageInput.onChange}
        />
      )}

      {imageInput.image && imageInput.image.url ? (
        <Image
          src={imageInput.image.url}
          alt={imageInput.image.alt}
          width={200}
          height={200}
          className={"mainImage"}
          onClick={goToImagesTab}
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
          onClick={() => imageInput.uploaderRef.current?.click()}
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
    </Box>
  );
}

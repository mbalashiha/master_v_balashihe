import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
type PaperProps = React.ComponentProps<typeof Paper>;

export default function UploaderComponent({ sx, ...rest }: PaperProps) {
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
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          background: "grey",
          cursor: "pointer",
          marginLeft: { sm: "-22px", md: "-13px" },
          marginTop: "-10px",
          minHeight: "120px",
          minWidth: "120px",
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
    </>
  );
}

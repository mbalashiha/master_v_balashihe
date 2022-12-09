import {
  HiOutlineX,
  HiOutlineArrowDown,
  HiOutlineArrowUp,
} from "react-icons/hi";
import Image from "next/image";
import React, { FC, useContext } from "react";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { IImageData } from "@/components/management/product/hooks/ProductEditorContext";
import {
  ProductEditorContext,
  ProductEditorContextProvider,
} from "@/components/management/product/hooks/ProductEditorContext";
import {
  Container,
  Card,
  Grid,
  Paper,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Skeleton,
} from "@mui/material";
import { VscTrash } from "react-icons/vsc";
import { ConfirmPopover } from "@components/ui";
import fetcher from "@/src/db/fetcher";
import useState from "react";
import { AlertTitle } from "@mui/material";
import { ImageInfo } from "@common/types/image";
import { useRemoveImage } from "@framework/commerce/management/product/image";
import { calculateAspectRatioFit } from "@lib/aspect-ration-fit";
import { DraftImageInfo } from "@common/commerce/types";

export interface ImageActionProps {
  length: number;
  image: DraftImageInfo;
  width: number;
  height: number;
  up: (sourceIndex: number) => void;
  down: (sourceIndex: number) => void;
}
const ImageAction = (props: ImageActionProps) => {
  const { image, length, width = 280, height = 360, up, down } = props;
  const imageIndex = (image.orderNumber || 1) - 1;
  if (typeof image.url !== "string" || !image.url) {
    throw new Error(
      "ImageAction component: Incorrect entry (Image) object: imgSrc property should presents!"
    );
  }
  const dims = calculateAspectRatioFit(
    image.width,
    image.height,
    width,
    height
  );
  const [errorResponse, setErrorResponse] = React.useState(null as any);
  const removeImage = useRemoveImage();
  const showArrowUp = length > 1 && (imageIndex ?? 0) > 0;
  const showArrowDown = length > 1 && (imageIndex ?? 0) < length - 1;
  return (
    <>
      <div
        key={image.url}
        style={{
          position: "relative",
          width: width,
        }}
      >
        <Image
          src={image.url}
          key={image.url}
          width={dims.width}
          height={dims.height}
          alt={image.url}
          // onClick={() => openSlider(entry.orderNumber)}
          style={{
            background: "grey",
            borderRadius: "8px",
            marginBottom: "0.4rem",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "auto",
            bottom: "auto",
            right: "-2.8rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ConfirmPopover
            message={"Удалить изображение?"}
            onConfirm={() => removeImage({ images: [image] })}
            trigger={
              <IconButton
                sx={{
                  padding: "5px",
                  margin: 0,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "white" : "black",
                  fontSize: "24pt",
                  "&:hover": {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <VscTrash />
              </IconButton>
            }
            // <div>
            //   <HiOutlineX
            //     style={{
            //       cursor: "pointer",
            //       fontSize: "2.0em",
            //       zIndex: 2,
            //       color: "black",
            //     }}
            //   />
            // </div>
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "auto",
            left: "auto",
            bottom: "calc(50% - 2.2em)",
            right: "-33px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {showArrowUp && (
            <IconButton
              onClick={() => up(imageIndex)}
              sx={{
                padding: "5px",
                margin: 0,
                marginBottom: "-14px",
                color: "rgba(59, 54, 147, 0.8)",
                fontSize: "25pt",
              }}
            >
              <HiOutlineArrowUp style={{}} />
            </IconButton>
          )}
          {showArrowDown && (
            <IconButton
              onClick={() => down(imageIndex)}
              sx={{
                padding: "5px",
                margin: 0,
                marginBottom: "-4px",
                color: "rgba(59, 54, 147, 0.8)",
                fontSize: "25pt",
              }}
            >
              <HiOutlineArrowDown style={{}} />
            </IconButton>
          )}
        </Box>
      </div>
    </>
  );
};
export default ImageAction;

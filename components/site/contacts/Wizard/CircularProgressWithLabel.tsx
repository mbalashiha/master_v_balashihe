import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey, blueGrey } from "@mui/material/colors";

export function CircularProgressWithLabel({
  label,
  size,
  sx,
  centerInfo,
  ...props
}: CircularProgressProps & {
  size: number;
  value: number;
  label?: string;
  centerInfo?: string;
}) {
  size = size || 160;
  return (
    <Box
      sx={{
        alignSelf: "center",
        justifySelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label && (
        <Typography
          variant="h4"
          sx={{
            fontSize: (size / 100) * 24 + "px",
            lineHeight: (size / 100) * 24 + "px",
            transform: "scaleX(0.54)",
            mb: "4px",
          }}
        >
          {label}
        </Typography>
      )}
      <Box
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size + "px",
          height: size + "px",
          borderRadius: "100%",
          background: grey[300],
        }}
      >
        <CircularProgress
          variant="determinate"
          size={size}
          thickness={(size / 100) * 18}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            ...sx,
          }}
          {...props}
        />
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            top: "auto",
            left: "auto",
            zIndex: 1,
            width: (size / 100) * 56 + "px",
            height: (size / 100) * 56 + "px",
            borderRadius: "100%",
          }}
        />
        {centerInfo && (
          <Typography
            variant="caption"
            component="div"
            sx={{
              "&&&&&": {
                zIndex: 2,
                fontSize: (size / 100) * 24 + "px",
                lineHeight: (size / 100) * 24 + "px",
                transform: "scaleX(0.54)",
              },
            }}
          >
            {centerInfo}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

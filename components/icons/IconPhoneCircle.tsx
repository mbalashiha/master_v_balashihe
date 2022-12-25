import { Theme } from "@mui/material/styles";
import { Box, SxProps } from "@mui/material";
type BoxProps = React.ComponentProps<typeof Box>;
type Props = BoxProps & {
  fill?: React.CSSProperties["color"];
  iconColor?: React.CSSProperties["color"];
};
const IconEmailCircle = ({ fill = "#aa203e", iconColor = "white", sx, ...props }: Props) => {
  return (
    <Box
      sx={
        {
          "& svg": {
            width: "44px",
            height: "44px",
            ...sx,
          },
        } as any
      }
      {...props}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6"
          y="6"
          width="90"
          height="90"
          rx="45"
          style={{ fill, fillOpacity: 1 }}
        />
        <path
          d="M72.36 60.0133C69.08 60.0133 65.9067 59.48 62.9467 58.52C62.483 58.3628 61.9843 58.3395 61.508 58.4527C61.0316 58.5659 60.5968 58.811 60.2533 59.16L56.0667 64.4133C48.52 60.8133 41.4533 54.0133 37.6933 46.2L42.8933 41.7733C43.6133 41.0267 43.8267 39.9867 43.5333 39.0533C42.5467 36.0933 42.04 32.92 42.04 29.64C42.04 28.2 40.84 27 39.4 27H30.1733C28.7333 27 27 27.64 27 29.64C27 54.4133 47.6133 75 72.36 75C74.2533 75 75 73.32 75 71.8533V62.6533C75 61.2133 73.8 60.0133 72.36 60.0133Z"
          style={{
            fill: iconColor,
          }}
        />
      </svg>
    </Box>
  );
};

export default IconEmailCircle;
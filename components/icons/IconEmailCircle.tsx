import { Theme } from "@mui/material/styles";
import { Box, SxProps } from "@mui/material";
type BoxProps = React.ComponentProps<typeof Box>;
type Props = BoxProps & {
  fill?: React.CSSProperties["color"];
  iconColor?: React.CSSProperties["color"];
};
const IconEmailCircle = ({
  fill = "#aa203e",
  iconColor = "white",
  sx,
  ...props
}: Props) => {
  return (
    <Box
      sx={
        {
          "& svg": {
            ...sx,
          },
        } as any
      }
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="50"
          style={{ fill, fillOpacity: 1 }}
        />
        <path
          d="M72.3334 29.6667H29.6667C26.7334 29.6667 24.36 32.0667 24.36 35.0001L24.3334 67.0001C24.3334 69.9334 26.7334 72.3334 29.6667 72.3334H72.3334C75.2667 72.3334 77.6667 69.9334 77.6667 67.0001V35.0001C77.6667 32.0667 75.2667 29.6667 72.3334 29.6667ZM72.3334 40.3334L51 53.6667L29.6667 40.3334V35.0001L51 48.3334L72.3334 35.0001V40.3334Z"
          style={{
            fill: iconColor,
          }}
        />
      </svg>
    </Box>
  );
};

export default IconEmailCircle;

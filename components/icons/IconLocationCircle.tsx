import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
type BoxProps = React.ComponentProps<typeof Box>;
type Props = BoxProps & {
  fill?: React.CSSProperties["color"];
  iconColor?: React.CSSProperties["color"];
};
const IconEmailCircle = ({
  fill,
  iconColor = "white",
  sx,
  ...props
}: Props) => {
  const { palette } = useTheme();
  fill = fill || palette.primary.main;
  return (
    <Box
      sx={
        {
          "& svg": { fill, ...sx },
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
          style={{ fill: fill || "#aa203e", fillOpacity: 1 }}
        />
        <path
          d="M51 24.3333C39.8 24.3333 29.6667 32.9199 29.6667 46.1999C29.6667 55.0533 36.7867 65.5333 51 77.6666C65.2134 65.5333 72.3334 55.0533 72.3334 46.1999C72.3334 32.9199 62.2 24.3333 51 24.3333ZM51 50.9999C48.0667 50.9999 45.6667 48.5999 45.6667 45.6666C45.6667 42.7333 48.0667 40.3333 51 40.3333C53.9334 40.3333 56.3334 42.7333 56.3334 45.6666C56.3334 48.5999 53.9334 50.9999 51 50.9999Z"
          style={{
            fill: iconColor,
          }}
        />
      </svg>
    </Box>
  );
};

export default IconEmailCircle;

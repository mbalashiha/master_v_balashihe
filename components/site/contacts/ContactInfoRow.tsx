import { Container, Grid, Card, Paper, Stack, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  svgIcon: JSX.Element;
  label?: React.ReactNode;
  infoText: React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}
export const ContactInfoRow = ({ svgIcon, label, infoText, sx }: Props) => {
  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{ height: "48px", ...sx }}
      justifyItems="flex-end"
    >
      <Box
        sx={{
          width: "56px",
          "& svg": {
            width: "48px",
            height: "48px",
          },
        }}
      >
        {svgIcon}
      </Box>
      <Stack direction="column" spacing={0} justifyContent="flex-end">
        {label && (
          <Typography
            component="span"
            sx={{
              fontSize: "16px",
              lineHeight: "16px",
              fontWeight: 400,
              fontFamily: "Arial",
              color: "grey.600",
            }}
          >
            {label}
          </Typography>
        )}
        <Typography
          component="span"
          sx={{
            fontSize: "24px",
            lineHeight: "24px",
            fontWeight: 700,
            color: "#2e2d58",
          }}
        >
          {infoText}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default ContactInfoRow;

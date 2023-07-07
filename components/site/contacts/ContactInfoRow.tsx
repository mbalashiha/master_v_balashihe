import { Container, Grid, Card, Paper, Stack, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  svgIcon: JSX.Element;
  label: React.ReactNode;
  infoText: React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}
export const ContactInfoRow = ({ svgIcon, label, infoText, sx }: Props) => {
  return (
    <Stack direction="row" spacing={1} sx={sx}>
      <Box>{svgIcon}</Box>
      <Stack direction="column" spacing={0}>
        <Typography
          component="div"
          sx={{
            fontSize: "16px",
            lineHeight: "32px",
            fontWeight: 400,
            fontFamily: "Arial",
            color: "grey.600",
          }}
        >
          {label}
        </Typography>
        <Typography
          component="div"
          sx={{
            fontSize: "36px",
            lineHeight: "38px",
            fontWeight: 700,
          }}
        >
          {infoText}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default ContactInfoRow;

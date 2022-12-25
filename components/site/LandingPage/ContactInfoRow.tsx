import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  svgIcon: JSX.Element;
  label: React.ReactNode;
  infoText: React.ReactNode | React.ReactNode[];
}
export const ContactInfoRow = ({ svgIcon, label, infoText }: Props) => {
  return (
    <Stack direction="row" spacing={1}>
      <Box>{svgIcon}</Box>
      <Box>
        <Typography
          component="div"
          sx={{
            "&, & > *": {
              fontSize: "16px",
              lineHeight: "25px",
              fontWeight: 400,
              fontFamily: "Arial",
              color: "grey.600",
              marginBottom: "-6px",
            },
          }}
        >
          {label}
        </Typography>
        <Typography
          component="div"
          sx={{
            "&, & a": {
              fontSize: "20px",
              lineHeight: "31px",
              fontWeight: 700,
              color: (theme) => theme.palette.text.primary,
              marginTop: "-6px",
            },
          }}
        >
          {infoText}
        </Typography>
      </Box>
    </Stack>
  );
};
export default ContactInfoRow;

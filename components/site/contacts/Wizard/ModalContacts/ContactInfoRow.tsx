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
          width: { xs: "60px", md: "70px" },
          textAlign: "left",
          "& svg": {
            width: { xs: "48px", md: "58px" },
            height: { xs: "48px", md: "58px" },
          },
        }}
      >
        {svgIcon}
      </Box>
      <Stack
        direction="column"
        spacing={0}
        justifyContent={label ? "space-between" : "flex-end"}
      >
        {label && (
          <Typography
            component="span"
            sx={{
              fontSize: "16px",
              lineHeight: "16px",
              fontWeight: 400,
              fontFamily: "Arial",
              "&&&&&": {
                color: "grey.600",
              },
            }}
          >
            {label}
          </Typography>
        )}
        <Typography
          component="span"
          className="contactInfoText"
          sx={{
            fontWeight: 700,
            wordBreak: "break-word",
            fontSize: { xs: "25px", md: "30px" },
            lineHeight: { xs: "25px", md: "30px" },
          }}
        >
          {infoText}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default ContactInfoRow;

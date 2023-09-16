import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSiteModal } from "@components/site/ModalProvider";
interface Props {
  svgIcon: JSX.Element;
  label: React.ReactNode;
  infoText: React.ReactNode | React.ReactNode[];
}
export const ContactInfoRow = ({ svgIcon, label, infoText }: Props) => {
  const { toggleModal } = useSiteModal();
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
          onClick={() => toggleModal("contact list")}
          component="div"
          sx={{
            cursor: "pointer",
            "&, & a": {
              fontSize: "20px",
              lineHeight: "31px",
              fontWeight: 700,
              color: "text.primary",
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

import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import PhoneRow from "./PhoneRow";
import EmailRow from "./EmailRow";
import TelegramRow from "./TelegramRow";
import WhatsappRow from "./WhatsappRow";

export const xsSpacing = "3px";

export default function ModalContacts() {
  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: xsSpacing, md: 2 }}
        sx={{
          letterSpacing: "0.001rem",
        }}
      >
        <Stack direction={"column"} spacing={{ xs: xsSpacing, md: 2 }}>
          <PhoneRow />
          <EmailRow />
        </Stack>
        <Stack direction={"column"} spacing={{ xs: xsSpacing, md: 2 }}>
          <TelegramRow />
          <WhatsappRow />
        </Stack>
      </Stack>
      <Divider
        sx={{
          transform: "scaleY(2)",
          mt: { xs: "10px", md: "18px" },
          mb: { xs: "4px", md: "10px" },
        }}
      />
    </Box>
  );
}

import { MainActionButton } from "@components/ui";
import { Box, Card, Paper, Stack, TextField } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { LoginFormFormik, LoginLayout } from "@components/management";

export default function LoginPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "#313050",
      }}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper
        sx={{
          width: { xs: "97vw", sm: "460px" },
          padding: { xs: 2, sm: 3, md: 4 },
        }}
        elevation={3}
      >
        <LoginFormFormik />
      </Paper>
    </Box>
  );
}
LoginPage.Layout = LoginLayout;

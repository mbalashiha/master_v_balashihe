import { MainActionButton } from "@components/ui";
import { Box, Card, Paper, Stack, TextField } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { ErrorsProvider } from "@components/ui/contexts/use-errors-context";
import Typography from "@mui/material/Typography";
import { LoginFormContainer, LoginLayout } from "@components/management";

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
          background: grey[50],
          "& *": {
            color: "#3D3357",
          },
        }}
        elevation={3}
      >
        <ErrorsProvider>
          <LoginFormContainer></LoginFormContainer>
        </ErrorsProvider>
      </Paper>
    </Box>
  );
}
LoginPage.Layout = LoginLayout;

import { MainActionButton } from "@components/ui";
import { Box, Card, Paper, Stack, TextField } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { ErrorsProvider } from "@components/ui/contexts/use-errors-context";
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
    ></Box>
  );
}
LoginPage.Layout = LoginLayout;

import { MainActionButton } from "@components/ui";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { ErrorsProvider } from "@components/ui/contexts/use-errors-context";
import Typography from "@mui/material/Typography";
import { ManagementLayout } from "@components/management";
import { useSnackbar } from "notistack";
import React from "react";
import Link from "next/link";

export default function ManagementHomePage() {
  const { enqueueSnackbar } = useSnackbar();
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(count);
  countRef.current = count;
  const enqueueSnackbarRef = React.useRef(enqueueSnackbar);
  enqueueSnackbarRef.current = enqueueSnackbar;
  React.useEffect(() => {
    const iid = window.setInterval(() => {
      const count = countRef.current + 1;
      const enqueueSnackbar = enqueueSnackbarRef.current;
      setCount(count);
      enqueueSnackbar(count);
      if (count > 2) {
        window.clearInterval(iid);
      }
    }, 1000);
    return () => window.clearInterval(iid);
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Link href="/management/blog/article/create">
            <Button>Добавить статью</Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </>
  );
}
ManagementHomePage.Layout = ManagementLayout;

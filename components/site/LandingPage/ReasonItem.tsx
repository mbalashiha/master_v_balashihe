import { Layout } from "@components/site";
import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LandingCard from "@components/shared/LandingCard";
import { IconOne } from "./Icons/IconOne";
interface Props {
  svgIcon: JSX.Element;
  title: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}
export const ReasonItem = ({ svgIcon, title, children }: Props) => {
  return (
    <Grid item xs={12} md={6}>
      <Stack direction="row" spacing={1}>
        <Box sx={{ "& svg": { width: "100px", height: "100px" } }}>
          {svgIcon}
        </Box>
        <Box>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "15px", lineHeight: "23px" }}
          >
            {children}
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
};
export default ReasonItem;

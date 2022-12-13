import { Layout } from "@components/site";
import { Container, Grid, Card, Paper, Stack } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface Props {
  title: React.ReactNode;
  amount: string | number;
}
export const PriceRow = ({ title, amount }: Props) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      sx={{
        "& .MuiTypography-root": {
          fontSize: { xs: "18px", sm: "12px", md: "16px" },
          lineHeight: { xs: "24px", sm: "16px", md: "20px" },
          fontWeight: 600,
        },
      }}
    >
      <Typography component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <Typography component="div">от {amount} &#x20bd;</Typography>
    </Stack>
  );
};
export default PriceRow;

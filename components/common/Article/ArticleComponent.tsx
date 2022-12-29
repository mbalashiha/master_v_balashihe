import { Box, Typography, Paper } from "@mui/material";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
}

export default function Article({ title, children }: Props) {
  return (
    <>
      <Typography component="h1" variant="h5" gutterBottom>
        {title}
      </Typography>
      <Paper
        component="article"
        elevation={0}
        sx={{
          padding: { xs: "1.5em 1em 1em 1em", md: "2em" },
          "& p, & .MuiPaper-root": {
            fontFamily: '"Segoe UI", Tahoma, Verdana, Arial',
            fontSize: "20px",
            lineHeight: "32px",
            color: (theme) =>
              theme.palette.mode === "dark" ? "white" : "black",
          },
          "& .MuiPaper-elevation1": {
            fontSize: "17px",
            lineHeight: "25px",
            marginBottom: "2rem",
            boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.2)",
          },
          "& > h2:first-of-type": {
            marginTop: 0,
          },
        }}
      >
        {children}
      </Paper>
    </>
  );
}

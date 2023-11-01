import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Container, Fab, Paper } from "@mui/material";
import Link from "next/link";

export default function FabButtons() {
  return (
    <Container
      maxWidth={false}
      sx={{
        "&&": { maxWidth: "1890px", px: { xl: "6px" }, py: "2px" },
        "& > *": {
          float: "right",
        },
        "& svg": {
          transform: "scale(1.5)",
        },
      }}
    >
      <Link href="/management/blog/article/create">
        <Fab>
          <AddRoundedIcon />
        </Fab>
      </Link>
    </Container>
  );
}

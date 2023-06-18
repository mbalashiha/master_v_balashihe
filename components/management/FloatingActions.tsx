import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const FloatingActions = () => {
  // const classes = useStyles();
  return (
    <Box>
      <Link href="/management/add-product">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
};
export default FloatingActions;

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 0,
    left: "auto",
    position: "fixed",
    maxHeight: "100vh",
    minHeight: "30vh",
  },
  addButton: {
    background: "#d50000",
    "&:hover": {
      background: "black",
    },
  },
});  
const FloatingActions = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Link href="/management/add-product">
        <Fab color="primary" aria-label="add" className={classes.addButton}>
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
};
export default FloatingActions;

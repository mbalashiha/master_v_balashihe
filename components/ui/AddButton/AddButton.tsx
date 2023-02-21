import Button from "@components/ui/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddButton: typeof Button = (props) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
      {...props}
    />
  );
};
export default AddButton;
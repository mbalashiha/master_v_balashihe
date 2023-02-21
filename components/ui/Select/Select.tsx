import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

type Props = React.ComponentProps<typeof MuiSelect> & {
  label: string;
  id?: string;
  values: Array<{
    value: string | number;
    name: string | React.ReactNode;
    description?: React.ReactNode;
  }>;
};
const Select = ({ label, id, values, sx, ...rest }: Props) => {
  return (
    <FormControl variant="filled" sx={{ width: "100%", minWidth: 120, ...sx }}>
      <InputLabel id={`${id || label}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${id || label}-label`}
        id={`${id || label}`}
        {...rest}
      >
        {values.map(({ value, name, description }) => (
          <MenuItem key={value} value={value}>
            {name}
            {description && description !== name && <em>{description}</em>}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
export default Select;

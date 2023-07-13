import { EnhImage } from "@components/ui";
import Radio, { RadioProps } from "@mui/material/Radio";
import { Paper } from "@mui/material";
interface Props extends RadioProps {
  image: JSX.Element;
}
export default function WizRadio({ image, sx, ...props }: Props) {
  return (
    <>
      <Radio
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          "& svg": {
            fontSize: 28,
          },
          ...sx,
        }}
        {...props}
      />
      {image}
    </>
  );
}

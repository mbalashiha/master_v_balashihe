import { styled, Link } from "@mui/material";

interface Props extends Omit<React.ComponentProps<typeof Link>, "children"> {
  value: string;
}
const PhoneLink = ({ value, underline, ...rest }: Props) => {
  const phoneText = value;
  if (!phoneText) {
    throw new Error("PhoneLink: No phone number!");
  }
  const phoneNumber = value.replace(/[^\+\d]/gim, "").replace(/^[8]/, "+7");
  if (!phoneNumber) {
    throw new Error("PhoneLink: No phone number!");
  }
  return (
    <>
      <Link
        href={`tel:${phoneNumber}`}
        underline={underline || "none"}
        {...rest}
      >
        {phoneText}
      </Link>
    </>
  );
};

export default PhoneLink;

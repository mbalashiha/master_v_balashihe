import { styled, Link } from "@mui/material";

interface Props extends Omit<React.ComponentProps<typeof Link>, 'children'> {
  email: string;
}
const EmailLink = ({ email, underline, ...rest }: Props) => {
  if (!email) {
    throw new Error("EmailLink: No email!");
  }
  return (
    <>
      <Link href={`mailto:${email}`} underline={underline || "none"} {...rest}>
        {email}
      </Link>
    </>
  );
};

export default EmailLink;

import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import Image from "next/image";
import Link from "next/link";
interface Props {
  url: string;
  active: true | null;
  title: string;
}
interface LinkComponentProps extends Props {
  children: React.ReactNode | React.ReactNode[];
}
const LinkComponent = ({
  title,
  url,
  active,
  children,
}: LinkComponentProps) => {
  if (active) {
    return <div>{children}</div>;
  } else {
    return (
      <Link href={url} as={url}>
        {children}
      </Link>
    );
  }
};
export default function SidebarLink({ title, url, active }: Props) {
  active = active || !url ? true : null;
  return (
    <Button
      component={"li"}
      disabled={Boolean(active)}
      sx={{
        mx: 0,
        width: "100%",
        border: "none",
        background: "none",
        color: active && "black !important",
        "&:hover": {
          backgroundColor: "transparent",
          color: "red",
        },
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "3px 3px 3px 10px",
      }}
      startIcon={<EastRoundedIcon />}
    >
      <LinkComponent title={title} url={url} active={active}>
        {title}
      </LinkComponent>
    </Button>
  );
}

import { Box, Typography, Paper, Grid, Stack, Button } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import Image from "next/image";
import Link from "next/link";
interface Props {
  item: NavigationEntry;
}
interface LinkComponentProps extends Props {
  children: React.ReactNode | React.ReactNode[];
}
const LinkComponent = ({ item, children }: LinkComponentProps) => {
  if (item.active) {
    return <>{children}</>;
  } else {
    return <Link href={item.href}>{children}</Link>;
  }
};
export default function SidebarLink({ item }: Props) {
  return (
    <Box key={item.href} component="li">
      <LinkComponent item={item}>
        <Button
          sx={{
            padding: 0,
            margin: 0,
            px: 1,
            border: "none",
            background: "none",
            "&:hover": {
              background: "none",
              color: "red",
            },
            "&:disabled": {
              color: "black",
            },
          }}
          disabled={!!item.active}
          startIcon={<EastRoundedIcon />}
        >
          {item.name}
        </Button>
      </LinkComponent>
    </Box>
  );
}

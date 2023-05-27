import Link from "next/link";
import Image from "next/image";
import { Blog } from "@common/types/cms";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { EnhImage } from "@components/ui";
import { grey } from "@mui/material/colors";
interface LinkProps extends Blog.NavigationItem {
  children: React.ReactNode | React.ReactNode[];
}
export const LinkListItem = ({
  children,
  active,
  url,
  title,
  image,
}: LinkProps) => {
  if (active || !url) {
    return (
      <ListItem>
        <ListItemButton
          disableRipple
          sx={{
            "&, &:hover": {
              cursor: "default",
              background: grey[900],
              "& .MuiTypography-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon className={"active"}>
            <ArrowForwardIosRoundedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          {children}
        </ListItemButton>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <ListItemButton
          component={({ children, ...rest }) => (
            <Link {...rest} href={url} as={url}>
              {children}
            </Link>
          )}
        >
          <ListItemIcon>
            {image && (
              <EnhImage
                width={image.width}
                height={image.height}
                fitWidth={50}
                fitHeight={50}
                src={image.url}
                alt={image.alt}
              />
            )}
          </ListItemIcon>
          {children}
        </ListItemButton>
      </ListItem>
    );
  }
};
export default LinkListItem;

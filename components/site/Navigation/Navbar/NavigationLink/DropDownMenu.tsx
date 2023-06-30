import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { Box, ListItem } from "@mui/material";
import { NavLinkProps } from "./NavigationLink";
import Link from "next/link";

type Props = NavLinkProps;

const DropDownMenu = ({ submenu, ...link }: Props) => {
  return (
    <Box
      className="dropdown"
      sx={{
        position: "relative",
        display: "inline-block",
        transitionProperty: "background, background-color",
        "&, & > button, && > .dropbtn, && > button.dropbtn": {
          borderRadius: `8px 8px 0 0`,
        },
        "& > .dropdown-content": {
          transitionProperty: "background, background-color",

          display: "none",
          //   transformOrigin: "top center",
          //   transform: "scale(0)",
          //   opacity: 0,
          position: "absolute",
          right: 0,
          backgroundColor: "#f9f9f9",
          minWidth: "100%",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          zIndex: 1,
          borderRadius: `0 0 8px 8px`,
          "& > *": {
            "&, & > .dropbtn, & > button.dropbtn, & > button": {
              borderRadius: 0,
            },
            "&:last-child": {
              "&, & > .dropbtn, & > button.dropbtn, & > button": {
                borderRadius: `0 0 8px 8px`,
              },
            },
          },
          "& a": {
            justifyContent: "flex-start",
          },
        },
        "& .dropbtn, & button.dropbtn": {
          transitionProperty: "background, background-color",
          borderRadius: `8px 8px 0 0`,
        },
        "&:hover": {
          "& > .dropbtn, & > button.dropbtn": {
            transitionProperty: "background, background-color",
            background: (theme) => theme.palette.primary.main,
            color: "white",
          },
          "& > .dropdown-content": {
            display: "block",
            // transform: "scale(1)",
            // opacity: 1,
          },
        },
        "& .dropdown-content": {
          "& > div": {
            width: "100%",
            "& > .dropbtn, & > button.dropbtn, & > button": {
              ...standartCssTransition,
              width: "100%",
              justifyContent: "flex-start",
            },
          },
        },
      }}
    >
      <button className="dropbtn">{link.name}</button>
      <Box className="dropdown-content">
        {submenu?.map((item) => (
          <>
            {item.href ? (
              <Link href={item.href} key={item.name + "_" + item.href}>
                {item.name}
              </Link>
            ) : (
              <DropDownMenu {...item} key={item.name + "_" + item.href} />
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};
export default DropDownMenu;

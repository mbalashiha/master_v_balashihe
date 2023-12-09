import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { Box, ClickAwayListener, ListItem } from "@mui/material";
import { NavLinkProps } from "./NavigationLink";
import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import React from "react";

type Props = Partial<React.ComponentProps<typeof Box> & NavLinkProps>;

const DropDownMenu = ({ submenu, name, href, active, ...rest }: Props) => {
  const [opened, setOpened] = useState<boolean | null>(null);
  return (
    <ClickAwayListener
      onClickAway={(event) => {
        if (opened !== null) {
          setOpened(null);
        }
      }}
    >
      <Box
        {...rest}
        className={cn(
          rest.className,
          "dropdown",
          { clicked: Boolean(opened) },
          { closed: opened === false }
        )}
        sx={{
          zIndex: 1,
          position: "relative",
          display: "inline-block",
          px: 0,
          py: 0,
          "& button.dropbtn": {
            border: "none",
            borderRadius: `8px 8px 0 0`,
            "& > .material-icons": {
              transform: `rotate(0)`,
            },
            "&:hover > .material-icons": {
              transform: `rotate(0.25turn)`,
            },
          },
          "&.clicked:not(.closed)": {
            "& button.dropbtn": {
              "& > .material-icons": {
                transform: `rotate(0.25turn)`,
              },
            },
          },
          "&:hover, &.clicked": {
            "& > .dropdown-content": {
              display: "block",
            },
          },
          "&.closed": {
            "& > .dropdown-content": {
              display: "none",
            },
          },
          "& .dropdown-content": {
            listStyleType: "decimal",
            display: "none",
            position: "absolute",
            minWidth: "300px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: 1,
            borderRadius: `0 0 8px 8px`,
            "& li .menu-item": {
              width: "auto",
              whiteSpace: "nowrap",
              minWidth: "220px",
              px: "15px",
              textAlign: "left",
              justifyContent: "flex-start",
              "&:hover": {
                color: "red",
              },
            },
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
          },
          ...rest.sx,
        }}
      >
        <button
          className={cn("menu-item", "dropbtn", { clicked: opened })}
          type="button"
          onClick={(event) => {
            setOpened((prev) => !prev);
          }}
        >
          {name}
          <span className="material-icons">keyboard_arrow_down</span>
        </button>
        <Box component="ul" className="dropdown-content">
          {submenu?.map((item) => (
            <Box component="li" key={item.name + "_" + item.href}>
              {item.href ? (
                <Link className="menu-item" href={item.href}>
                  {item.name}
                </Link>
              ) : (
                <DropDownMenu {...(item as any)} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};
export default DropDownMenu;

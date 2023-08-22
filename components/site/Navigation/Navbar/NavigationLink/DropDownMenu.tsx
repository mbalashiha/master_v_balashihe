import { standartCssTransition } from "@components/ui/theme/mui-theme";
import { Box, ClickAwayListener, ListItem } from "@mui/material";
import { NavLinkProps } from "./NavigationLink";
import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import React from "react";

type Props = NavLinkProps;

const DropDownMenu = ({ submenu, ...link }: Props) => {
  const [opened, setOpened] = useState(false);
  return (
    <ClickAwayListener
      onClickAway={(event) => {
        if (opened) {
          setOpened(false);
        }
      }}
    >
      <Box
        className={cn("dropdown", { clicked: opened })}
        sx={{
          zIndex: 1,
          position: "relative",
          display: "inline-block",
          "& > .dropdown-content": {
            display: "none",
            //   transformOrigin: "top center",
            //   transform: "scale(0)",
            //   opacity: 0,
            position: "absolute",
            right: 0,
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
            borderRadius: `8px 8px 0 0`,
          },
          "&:hover, &.clicked": {
            "& > .dropdown-content": {
              display: "block",
            },
          },
          "& .dropdown-content": {
            "& > div": {
              width: "100%",
              "& > .dropbtn, & > button.dropbtn, & > button": {
                width: "100%",
                justifyContent: "flex-start",
              },
            },
          },
        }}
      >
        <button
          className={cn("dropbtn", { clicked: opened })}
          type="button"
          onClick={(event) => {
            setOpened((prev) => !prev);
          }}
        >
          {link.name}
          <span className="material-icons">keyboard_arrow_down</span>
        </button>
        <Box className="dropdown-content">
          {submenu?.map((item) => (
            <React.Fragment key={item.name + "_" + item.href}>
              {item.href ? (
                <Link href={item.href}>{item.name}</Link>
              ) : (
                <DropDownMenu {...item} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};
export default DropDownMenu;

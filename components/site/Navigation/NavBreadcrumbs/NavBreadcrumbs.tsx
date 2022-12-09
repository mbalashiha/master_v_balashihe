import { FC } from "react";
import React, { useContext } from "react";
import { Container, Box, Dialog, Sidebar, styled } from "@components/ui";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import cn from "classnames";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { grey, blueGrey } from "@mui/material/colors";
const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "3.5rem",
  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
  "& .MuiContainer-root": {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.5rem",
    "& a, & .currentPage, & .MuiBreadcrumbs-separator": {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      color: "#474747",
      padding: "1rem 0",
      fontSize: "1rem",
      lineHeight: "1rem",
      fontWeight: 400,
    },
    "& a:hover": {
      color: theme.palette.mode === "dark" ? "white" : "black",
      textDecoration: "underline",
    },
  },
}));
const StyledBreadcrumbs = Breadcrumbs;
type Props = { breadcrumbs: Array<{ name: string; url: string }> | undefined };
const NavBreadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <>
      {breadcrumbs && (
        <StyledBox>
          <Container maxWidth="xl">
            <StyledBreadcrumbs
              aria-label="breadcrumb"
              separator={"\u2014"}
            >
              {breadcrumbs.map(({ name, url }, ind) => {
                const key = url.toString() + "_" + name.toString();
                const breadcrumbElement =
                  ind === breadcrumbs.length - 1 ? (
                    <div key={key} className={cn("currentPage")}>
                      {name}
                    </div>
                  ) : (
                    <Link key={key} href={url} as={url} passHref>
                      {name}
                    </Link>
                  );
                return breadcrumbElement;
              })}
            </StyledBreadcrumbs>
          </Container>
        </StyledBox>
      )}
    </>
  );
};
export default NavBreadcrumbs;

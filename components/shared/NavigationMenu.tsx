import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { isAuthorized } from "@/utils/auth0";
import styles from "@/components/shared/NavigationMenu.module.scss";

import ReactResizeDetector from "react-resize-detector";
import ActiveLink from "components/shared/ActiveLink";
import LandingContactForm from "@/components/home_landing/LandingContactForm";

const BsNavLink = (props) => {
  const { href, title, className = "" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  );
};


const Header = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return <></>;
};

export default Header;

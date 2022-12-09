import LandingInfo from "./LandingInfo";
import LandingContactForm from "./LandingContactForm";
import { Container } from "@mui/material";
import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import indexHeaderLandingStyles from "./IndexHeader.module.scss";

const IndexHeader = () => {
  return (
    <Box className={indexHeaderLandingStyles.landing_image_container}>
      <LandingContactForm />
    </Box>
  );
};
export default IndexHeader;

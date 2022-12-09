import React from "react";
import { Box, styled } from "@mui/material";
import { useGridTypeProvider } from "@components/management/product/GridTypeProvider";

interface MainSvgIconProps extends React.SVGProps<SVGSVGElement> {}
const SvgIconList = styled(({ children, ...props }: MainSvgIconProps) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.5 15.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM19 16a1 1 0 010 2H9a1 1 0 010-2h10zM5.5 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM19 11a1 1 0 010 2H9a1 1 0 010-2h10zM5.5 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM19 6a1 1 0 010 2H9a1 1 0 110-2h10z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
})(({ theme }) => ({
  width: "34px",
  height: "34px",
  display: "inline-block",
}));

const SvgIconGrid = styled(({ children, ...props }: MainSvgIconProps) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.436 13c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v2.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267H5.563c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 01-.757-.756c-.174-.326-.267-.65-.267-1.54v-2.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267h2.873zm10 0c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v2.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-2.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 01-.757-.756c-.174-.326-.267-.65-.267-1.54v-2.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267h2.873zm-10 2H5.564c-.26 0-.435.009-.542.022a4.762 4.762 0 00-.022.542v2.872c0 .26.009.434.022.542.107.013.282.022.542.022h2.872c.26 0 .435-.009.542-.022.013-.108.022-.282.022-.542v-2.872c0-.26-.009-.434-.022-.542A4.762 4.762 0 008.436 15zm10 0h-2.872c-.26 0-.434.009-.542.022a4.762 4.762 0 00-.022.542v2.872c0 .26.009.434.022.542.107.013.282.022.542.022h2.872c.26 0 .434-.009.542-.022.013-.108.022-.282.022-.542v-2.872c0-.26-.009-.434-.022-.542a4.762 4.762 0 00-.542-.022zm-10-12c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v2.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267H5.563c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 01-.757-.756C3.093 9.65 3 9.327 3 8.437V5.563c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267h2.873zm10 0c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v2.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-2.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 01-.757-.756c-.174-.326-.267-.65-.267-1.54V5.563c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267h2.873zm-10 2H5.564c-.26 0-.435.009-.542.022A4.762 4.762 0 005 5.564v2.872c0 .26.009.435.022.542.107.013.282.022.542.022h2.872c.26 0 .435-.009.542-.022C8.99 8.87 9 8.696 9 8.436V5.564c0-.26-.009-.435-.022-.542A4.762 4.762 0 008.436 5zm10 0h-2.872c-.26 0-.434.009-.542.022a4.762 4.762 0 00-.022.542v2.872c0 .26.009.435.022.542.107.013.282.022.542.022h2.872c.26 0 .434-.009.542-.022.013-.107.022-.282.022-.542V5.564c0-.26-.009-.435-.022-.542A4.762 4.762 0 0018.436 5z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
})(({ theme }) => ({
  width: "34px",
  height: "34px",
  display: "inline-block",
  margin: "10px",
}));

interface OneSideBoxProps extends React.ComponentProps<typeof Box> {
  side: "list" | "grid";
}
const OneSideBox = ({ side, children, sx, ...props }: OneSideBoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        zIndex: 0,
        margin: 0,
        padding: 0,
        backgroundRepeat: "no-repeat",
        boxSizing: "border-box",
        transition: "transform .2s linear",
        transform: side === "list" ? "translate(2px)" : "translate(42px)",
        // transform: "translate(2px)",
        position: "absolute",
        top: "2px",
        width: "48px",
        height: "36px",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#000000" : "#ffffff",
        borderRadius: "60px",
        boxShadow: (theme) =>
          theme.palette.mode === "dark" ? "none" : "0 1px 20px #04041C1A",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
interface InnerBoxProps extends React.ComponentProps<typeof Box> {
  active: Boolean;
}
const InnerBox = ({ active, children, sx, ...props }: InnerBoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        zIndex: 1,
        position: "relative",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        "-webkit-tap-highlight-color": "transparent",
        "-webkit-user-select": "none",
        borderRadius: "4px",
        userSelect: "none",
        textDecoration: "none",
        padding: 0,
        margin: 0,
        marginRight: 0,
        fontSize: 0,
        borderColor: "transparent",
        border: "none",
        height: "40px",
        width: "46px",
        "&, & svg path": {
          transition: "color .2s linear",
          color: (theme) =>
            theme.palette.mode === "dark"
              ? active
                ? "#E6E7FF"
                : "#6D6D7A"
              : active
              ? "#000000"
              : "#B5B5B9",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
/*
    
        "&, & svg": {color: (theme) =>
          theme.palette.mode === "dark"
            ? active
              ? "#ffffff"
              : "#b5b5b9"
            : active
            ? "#000000"
            : "#b5b5b9",
            
*/
export const ProductsListViewSwitcher = () => {
  const { viewGridType, chooseGrid, chooseList } = useGridTypeProvider();
  return (
    <Box
      onClick={() => {
        viewGridType === "list" ? chooseGrid() : chooseList();
      }}
      sx={{ cursor: "pointer", outline: "none", width: "92px", height: "40px" }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: "100%",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#3D3535" : "#f5f5f6",
          borderRadius: "60px",
          overflow: "hidden",
        }}
      >
        <OneSideBox side={viewGridType}></OneSideBox>
        <Box>
          <InnerBox active={viewGridType === "list"}>
            <SvgIconList />
          </InnerBox>
        </Box>
        <Box>
          <InnerBox active={viewGridType === "grid"}>
            <SvgIconGrid />
          </InnerBox>
        </Box>
      </Box>
    </Box>
  );
};

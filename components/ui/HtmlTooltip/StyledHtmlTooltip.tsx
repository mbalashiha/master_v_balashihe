import { styled, Box } from "@mui/material";
import React from "react";

export const StyledHtmlTooltip = styled("span")`
  /* popover */
  &[data-tooltip] {
    display: inline-block;
    position: relative;
  }
  &[data-tooltip].inline {
    display: inline;
  }
  &[data-tooltip] > strong {
    color: #ffffff;
    background: #555555;
    font-weight: 400;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 13pt;
    * {
      color: #fff;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 13pt;
    }
    & header {
      color: #bcd9e5;
      font-size: 14pt;
      font-weight: 400;
      margin-bottom: 0.3rem;
    }
    display: block;
    z-index: 3;
    pointer-events: none;
    width: 340px;
    overflow: hidden;
    white-space: normal;
    overflow-wrap: break-word;
    position: absolute;
    padding: 0.3rem 2rem;
    border-radius: 0.3rem;
    opacity: 0;
    visibility: hidden;
  }
  &[data-tooltip]::after {
    z-index: 3;
    content: "";
    pointer-events: none;
    width: 0;
    height: 0;
    position: absolute;
    border-color: #555;
    border-width: 0;
    border-style: solid;
    opacity: 0;
    visibility: hidden;
  }
  &[data-tooltip^="up"] > strong {
    bottom: calc(0.5rem + 100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="up"]::after {
    border-top-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    bottom: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="down"] > strong {
    top: calc(0.5rem + 100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="down"]::after {
    border-bottom-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    top: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="left"] > strong {
    right: calc(1rem + 100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-tooltip^="left"]::after {
    border-left-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    right: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-tooltip^="right"] > strong {
    left: calc(1rem + 100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-tooltip^="right"]::after {
    border-right-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    left: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-tooltip]:hover > strong,
  &[data-tooltip]:hover::after {
    visibility: visible;
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
  &[data-tooltip$="100"]:hover > strong,
  &[data-tooltip$="100"]:hover::after {
    transition-delay: 0.1s;
  }
  &[data-tooltip$="500"]:hover > strong,
  &[data-tooltip$="500"]:hover::after {
    transition-delay: 0.5s;
  }
  &[data-tooltip$="1000"]:hover > strong,
  &[data-tooltip$="1000"]:hover::after {
    transition-delay: 1s;
  }
`;
export default StyledHtmlTooltip;

import { styled, Box } from "@mui/material";
import React from "react";

export const StyledTooltip = styled("span")`
  /* popover */
  &[data-tooltip][aria-label] {
    display: inline-block;
    position: relative;
  }
  &[data-tooltip][aria-label].inline {
    display: inline;
  }
  &[data-tooltip][aria-label]::before {
    z-index: 3;
    content: attr(aria-label);
    max-width: 340px;
    overflow: hidden;
    white-space: pre;
    pointer-events: none;
    position: absolute;
    color: #fff;
    background: #555;
    padding: 0.3rem 2rem;
    border-radius: 0.3rem;
    opacity: 0;
    visibility: none;
    font-weight: 500;
  }
  &[data-tooltip][aria-label]::after {
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
    visibility: none;
  }
  &[data-tooltip^="up"][aria-label]::before {
    bottom: calc(0.5rem + 100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="up"][aria-label]::after {
    border-top-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    bottom: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="down"][aria-label]::before {
    top: calc(0.5rem + 100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="down"][aria-label]::after {
    border-bottom-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    top: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-tooltip^="left"][aria-label]::before {
    right: calc(1rem + 100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-tooltip^="left"][aria-label]::after {
    border-left-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    right: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-tooltip^="right"][aria-label]::before {
    left: calc(1rem + 100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-tooltip^="right"][aria-label]::after {
    border-right-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    left: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-tooltip][aria-label]:hover::before,
  &[data-tooltip][aria-label]:hover::after {
    visibility: visible;
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
  &[data-tooltip$="100"][aria-label]:hover::before,
  &[data-tooltip$="100"][aria-label]:hover::after {
    transition-delay: 0.1s;
  }
  &[data-tooltip$="500"][aria-label]:hover::before,
  &[data-tooltip$="500"][aria-label]:hover::after {
    transition-delay: 0.5s;
  }
  &[data-tooltip$="1000"][aria-label]:hover::before,
  &[data-tooltip$="1000"][aria-label]:hover::after {
    transition-delay: 1s;
  }
`;
export default StyledTooltip;

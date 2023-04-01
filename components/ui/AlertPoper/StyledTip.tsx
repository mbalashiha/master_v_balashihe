import { styled, Box } from "@mui/material";
import React from "react";

export const StyledTooltip = styled("span")`
  /* popover */
  &[data-alert][aria-label] {
    display: inline-block;
    position: relative;
  }
  &[data-alert][aria-label]::before {
    content: attr(aria-label);
    pointer-events: none;
    white-space: pre;
    position: absolute;
    color: #fff;
    background: #555;
    padding: 0.3rem 2rem;
    border-radius: 0.3rem;
    opacity: 0;
    visibility: none;
  }
  &[data-alert^="up"][aria-label]::before {
    bottom: calc(100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-alert^="up"][aria-label]::after {
    border-top-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    bottom: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-alert^="down"][aria-label]::before {
    top: calc(100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-alert^="down"][aria-label]::after {
    border-bottom-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    top: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-alert^="left"][aria-label]::before {
    right: calc(100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-alert^="left"][aria-label]::after {
    border-left-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    right: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-alert^="right"][aria-label]::before {
    left: calc(100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-alert^="right"][aria-label]::after {
    border-right-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    left: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-alert][aria-label]:hover::before {
    visibility: visible;
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
  &[data-alert$="100"][aria-label]:hover::before,
  &[data-alert$="100"][aria-label]:hover::after {
    transition-delay: 0.1s;
  }
  &[data-alert$="500"][aria-label]:hover::before,
  &[data-alert$="500"][aria-label]:hover::after {
    transition-delay: 0.5s;
  }
  &[data-alert$="1000"][aria-label]:hover::before,
  &[data-alert$="1000"][aria-label]:hover::after {
    transition-delay: 1s;
  }
`;
export default StyledTooltip;

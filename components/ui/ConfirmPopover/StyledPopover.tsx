import { styled } from "@mui/material";

export const StyledPopover = styled("div")`
  /* popover */
  &[data-popover] {
    display: block;
    position: relative;
  }
  &[data-popover] > .popoverChild {
    max-width: 340px;
    overflow: hidden;
    white-space: normal;
    position: absolute;
    color: white;
    background: black;
    padding: 0.8rem;
    border-radius: 0.7rem;
    opacity: 0;
    visibility: hidden;
  }
  &[data-popover]::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-color: black;
    border-width: 0;
    border-style: solid;
    opacity: 0;
    visibility: hidden;
  }
  &[data-popover^="up"] > .popoverChild {
    bottom: calc(0.5rem + 100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-popover^="up"]::after {
    border-top-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    bottom: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-popover^="down"] > .popoverChild {
    top: calc(0.5rem + 100%);
    right: 50%;
    transform: translateX(50%);
  }
  &[data-popover^="down"]::after {
    border-bottom-width: 0.5rem;
    border-right-width: 0.5rem;
    border-right-color: #0000;
    border-left-width: 0.5rem;
    border-left-color: #0000;
    top: 100%;
    right: 50%;
    transform: translateX(50%);
  }
  &[data-popover^="left"] > .popoverChild {
    right: calc(1rem + 100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-popover^="left"]::after {
    border-left-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    right: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-popover^="right"] > .popoverChild {
    left: calc(1rem + 100%);
    bottom: 50%;
    transform: translateY(50%);
  }
  &[data-popover^="right"]::after {
    border-right-width: 0.5rem;
    border-top-width: 0.5rem;
    border-top-color: #0000;
    border-bottom-width: 0.5rem;
    border-bottom-color: #0000;
    bottom: 50%;
    left: calc(0.5rem + 100%);
    transform: translateY(50%);
  }
  &[data-popover] > .popoverChild,
  &[data-popover]::after {
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
  &[data-popover].showing > .popoverChild,
  &[data-popover].showing::after {
    visibility: visible;
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
`;
export default StyledPopover;

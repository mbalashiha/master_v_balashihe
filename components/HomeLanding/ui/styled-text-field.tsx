import * as React from "react";
import { styled, TextField, TextFieldProps } from "@mui/material";

const ModTextFiled = ({ children, ...rest }: TextFieldProps) => {
  return (
    <TextField {...rest} variant="outlined">
      {children}
    </TextField>
  );
};
const StyledTextField = styled(ModTextFiled)`
  &&&&& {
    &,
    & .InputBase-root,
    & .InputBase-root input {
      font-family: sans-serif;
      z-index: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 0;
      margin: 0;
      max-height: 70px;
      overflow-y: visible;
      font-size: 1rem;
      border: none;
      box-shadow: none;
    }
    & .InputBase-root {
      border-radius: 10px;
      color: var(--accents-1);
      background-color: var(--input-bg-color);
      background: var(--input-bg-color);
      width: 100%;
      box-shadow: none;
      width: 100%;
      padding: 0;
      margin: 0;
      max-height: 70px;
      overflow-y: visible;
      font-size: 1rem;
      z-index: 0;
      & input {
        border: none;
        padding-right: calc(1.5em + 0.75rem);
        color: var(--accents-1);
        height: 50px;
        background-color: none;
        background: none;
        width: 100%;
        padding: 0rem 0.7rem;
        padding-top: 0.45rem;
        box-shadow: none;
        transition: none;
        font-family: sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.4rem;
      }
      &::before,
      &::after {
        display: none;
      }
      & .OutlinedInput-notchedOutline {
        border: 1px solid var(--accents-6);
        font-size: 0.99em;
        & > legend > span {
          font-family: var(--theme-font);
          padding-right: 0;
          font-size: 0.99em;
        }
      }
      &.Mui-focused {
        & .OutlinedInput-notchedOutline {
          border-color: rgb(13 110 253);
          box-shadow: none;
        }
      }
      &::hover {
        & .OutlinedInput-notchedOutline {
        }
      }
      &.Mui-error {
        & .OutlinedInput-notchedOutline {
          border-color: #dc3545;
          box-shadow: 0 0 0.1rem 0.2rem rgba(220, 53, 69, 0.1);
        }
        & input {
          border: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right calc(0.375em + 0.1875rem) center;
          background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
        &.Mui-focused {
          & .OutlinedInput-notchedOutline {
            box-shadow: 0 0 0.25rem 0.25rem rgba(220, 53, 69, 0.4);
          }
        }
      }
      &:after {
        border-bottom-color: transparent;
        border: none;
        transform: scaleX(0);
      }
    }
    & .FormHelperText-root {
      font-family: sans-serif;
      padding: 0;
      margin: 0;
      font-size: 0.845rem;
      margin-top: 0.22rem;
      &.Mui-error {
        color: red;
        opacity: 1;
      }
    }
    & .InputLabel-root,
    & label {
      z-index: 1;
      font-family: var(--theme-font);
      background: none;
      text-shadow: none;
      box-shadow: none;
      border: none;
      box-sizing: border-box;
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      font-size: 18px;
      color: var(--accents-5);
      font-weight: normal;
      margin: 0;
      padding: 0;
      margin-left: 0.7rem;
      pointer-events: none;
      transform-origin: 0 0;
      opacity: 1;
      transform: translateY(0.85rem) translateX(0);
      &.Mui-focused,
      &.InputLabel-shrink {
        padding: 0;
        height: auto;
        background: none;
        border: none;
        box-shadow: none;
        color: white;
        font-weight: normal;
        opacity: 1;
        transform: scale(0.66) translateY(-0.62rem) translateX(0);
        text-shadow: 0 0 9px black, 0 0 12px black, 0 0 14px black;
      }
    }
  }
`;

export default StyledTextField;

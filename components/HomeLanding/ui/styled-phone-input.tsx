import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ru from "react-phone-input-2/lang/ru.json";
import React from "react";
import { Box, styled } from "@mui/material";
import { useRef } from "react";

const StyledError = styled(Box)`
  &&&&& {
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    color: red;
    font-size: 0.845rem;
    margin-top: 0.35rem;
    border: none;
    box-shadow: none;
    background: none;
    transition: none;
  }
`;

const StyledLabel = styled("label")`
  display: block;
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
  font-weight: lighter;
  margin: 0;
  padding: 0;
  margin-left: 0.7rem;
  pointer-events: none;
  transform-origin: 0 0;
  opacity: 1;
  transition: all 0.1s ease-in-out;
  transform: scale(1.001) translateY(0.75rem) translateX(8.5rem);
  &.Mui-focused,
  &.MuiInputLabel-shrink {
    background: none;
    border: none;
    text-shadow: none;
    box-shadow: none;
    opacity: 1;
    color: white;
    font-weight: normal;
    transition: all 0.1s ease-in-out;
    transform: scale(0.66) translateY(-0.83rem) translateX(0rem);
    text-shadow: 0 0 9px black, 0 0 12px black, 0 0 14px black;
  }
`;
type Props = PhoneInputProps & {
  labelText: string;
  errorMessage?: string | null | undefined;
};
const StyledContainer = styled(Box)`
  &&& {
    display: block;
    font-family: sans-serif;
    max-height: 70px;
    padding-bottom: 2px;
    transition: none;
    & .MuiBox-root {
      height: 50px;
      padding: 0;
      display: block;
      position: relative;
      font-family: sans-serif;
      border-radius: 10px;
      box-shadow: none;
      transition: box-shadow 0.1s ease-in-out, border 0.1s ease-in-out;
      border: 1px solid var(--accents-6);
      &.Mui-focused {
        border: 1px solid rgb(13 110 253);
        box-shadow: none;
      }
    }
    & .selected-flag {
      padding: 0;
      padding-left: 1.4px;
      margin-left: 0.7rem;
      margin-top: 0.1rem;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    & .selected-flag,
    & .flag-dropdown {
      &,
      &.open {
        border: none;
        background-color: none;
        background: none;
      }
    }
    & .country-list {
      color: white;
      background-color: var(--accents-9);
      z-index: 2;
      margin-top: 4px;
      margin-left: 0.5rem;
      width: 18.55rem;
      border-radius: 0;
      /* box-shadow: 0 -11px 0 1px white, 0 11px 0 1px white, inset 0 0 0 1px white; */
      scrollbar-width: thin;
      scrollbar-color: #aa0000 transparent;
      & .divider {
        border-bottom-color: var(--accents-7);
      }
      & .country {
        & .dial-code {
          color: var(--accents-5);
        }
        &.highlight {
          background-color: var(--accents-8);
        }
        &:hover {
          background-color: var(--accents-7);
        }
      }
      ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        &:horizontal {
          width: auto;
        }
        background: transparent;
        box-shadow: none;
      }
      ::-webkit-scrollbar-corner {
        background: transparent;
      }
      ::-webkit-scrollbar-button {
        &,
        &:single-button {
          background: transparent;
          padding: 0;
          margin: 0;
          width: 0;
          height: 0;
        }
      }
      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 0;
        background: transparent;
        width: inherit;
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #aa0000;
        border-radius: 2rem;
        box-shadow: none;
        width: auto;
        height: auto;
        min-height: 36px;
        &:horizontal {
          min-height: auto;
        }
        transition: all ease-in-out 75ms;
        /* Handle on hover */
        &:hover {
          background: #d80000;
        }
      }
    }
  }
  &&& input {
    height: 47px;
    color: var(--accents-1);
    margin: 0;
    background-color: var(--input-bg-color);
    background: var(--input-bg-color);
    border-radius: 10px;
    width: 100%;
    padding: 0rem 0.7rem;
    padding-top: 0.2rem;
    padding-bottom: 0rem;
    padding-left: 3rem;
    border: none;
    box-shadow: none;
    font-family: sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    font-size: 0.94rem;
    line-height: 1.4rem;
  }
  &&& .Mui-error {
    & {
      border-color: #dc3545;
      box-shadow: 0 0 0.1rem 0.2rem rgba(220, 53, 69, 0.1);
      &.Mui-focused {
        box-shadow: 0 0 0.25rem 0.25rem rgba(220, 53, 69, 0.4);
        border: 1px solid #dc3545;
      }
    }
    input {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
  }
`;
const StyledPhoneInput: React.FC<Props> = ({
  labelText,
  errorMessage,
  ...rest
}: Props) => {
  const labelRef = useRef() as React.MutableRefObject<HTMLLabelElement>;
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  return (
    <StyledContainer>
      <Box ref={containerRef} className={(errorMessage && "Mui-error") || ""}>
        <PhoneInput
          {...rest}
          placeholder=""
          onFocus={(event, data) => {
            if (
              containerRef.current &&
              !containerRef.current.classList.contains("Mui-focused")
            ) {
              containerRef.current.classList.add("Mui-focused");
            }
            if (
              labelRef.current &&
              !labelRef.current.classList.contains("Mui-focused")
            ) {
              labelRef.current.classList.add("Mui-focused");
            }
            if (rest.onFocus) {
              return rest.onFocus(event, data);
            }
          }}
          onBlur={(event, data) => {
            if (
              containerRef.current &&
              containerRef.current.classList.contains("Mui-focused")
            ) {
              containerRef.current.classList.remove("Mui-focused");
            }
            if (
              labelRef.current &&
              labelRef.current.classList.contains("Mui-focused")
            ) {
              labelRef.current.classList.remove("Mui-focused");
            }
            if (rest.onBlur) {
              return rest.onBlur(event, data);
            }
          }}
          onChange={(value, country, e, formattedValue) => {
            if (labelRef.current && value && value.length > 1) {
              if (
                !labelRef.current.classList.contains("MuiInputLabel-shrink")
              ) {
                labelRef.current.classList.add("MuiInputLabel-shrink");
              }
            } else if (labelRef.current && (!value || value.length <= 1)) {
              if (labelRef.current.classList.contains("MuiInputLabel-shrink")) {
                labelRef.current.classList.remove("MuiInputLabel-shrink");
              }
            }
            if (rest.onChange) {
              return rest.onChange(value, country, e, formattedValue);
            }
          }}
        />
        <StyledLabel ref={labelRef}>{labelText}</StyledLabel>
      </Box>
      {errorMessage ? <StyledError>Укажите Ваш телефон</StyledError> : null}
    </StyledContainer>
  );
};
export default StyledPhoneInput;

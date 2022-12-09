import React from "react";
import { MuiTelInput } from "mui-tel-input";
import RussianFlagStyle from "./RussianFlagStyle";
import NoCountryCodeStyle from "./NoCountryCodeStyle";
import { styled } from "@mui/material";
const PrestyledMuiTelInput = styled(MuiTelInput)(({ theme }) => ({
  "& .MuiButtonBase-root.MuiIconButton-root.MuiTelInput-IconButton": {
    borderRadius: "5px",
    "& .MuiTelInput-Flag": {
      boxShadow: "0 1px 5px rgb(0 0 0 / 35%)",
    },
  },
}));
type Props = React.ComponentProps<typeof MuiTelInput> & {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};
const StyledPhoneInput: React.FC<Props> = ({
  name,
  value,
  sx,
  onChange,
  onFocus,
  ...props
}) => {
  const [lastCountryCode, setLastCountryCode] = React.useState<string | null>(
    null
  );
  const innerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!lastCountryCode) {
      let flagStyleToSet = NoCountryCodeStyle;
      if (!value || value.trim().startsWith("+7") || value.trim() === "+") {
        flagStyleToSet = RussianFlagStyle;
      }
      if (
        innerRef.current &&
        typeof innerRef.current.querySelector === "function"
      ) {
        const flagNode = innerRef.current.querySelector(
          ".MuiTelInput-Flag"
        ) as HTMLSpanElement;
        if (flagNode && flagNode.style) {
          flagNode.setAttribute("style", flagStyleToSet);
        }
      }
    }
  }, [lastCountryCode, value]);
  return (
    <PrestyledMuiTelInput
      sx={{ width: "100%", ...sx }}
      ref={innerRef}
      langOfCountryName="ru"
      preferredCountries={["RU", "KZ", "BY", "UZ", "IR", "CN", "IN", "UA"]}
      name={name}
      value={value}
      onFocus={(event) => {
        if (typeof onFocus === "function") {
          onFocus(event);
        }
        if (!value) {
          return onChange({
            target: {
              name,
              value: "+7",
            },
          });
        }
      }}
      onChange={(value, info) => {
        setLastCountryCode(info.countryCode);
        if (
          info.numberValue &&
          info.numberValue.length > 12 &&
          info.numberValue.startsWith("+7")
        ) {
          value = info.numberValue.substring(0, 12);
        } else if (info.numberValue && info.numberValue.length > 24) {
          value = info.numberValue.substring(0, 24);
        }
        return onChange({
          target: {
            name,
            value,
          },
        });
      }}
      {...props}
    />
  );
};

// const StyledPhoneInput = ({ onChange, ...props }) => {
//   return (
//     <PrestyledPhoneInput
//       country={"ru"}
//       localization={ru}
//       preferredCountries={["ru", "kz", "by", "uz", "ua", "ir", "cn", "in"]}
//       priority={{
//         ru: 1,
//         kz: 2,
//         by: 3,
//         uz: 4,
//         ua: 5,
//         ir: 6,
//         cn: 8,
//         in: 9,
//       }}
//       inputComponent={CustomTextField as any}
//       onChange={(...params) => {
//         let value = (params[3] || "").toString();
//         if (typeof onChange === "function") {
//           onChange({
//             target: {
//               name: props.name || "",
//               value,
//             },
//           });
//         }
//       }}
//       {...props}
//     />
//   );
// };
export default StyledPhoneInput;

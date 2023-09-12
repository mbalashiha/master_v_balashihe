import { Button, Stack, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import util from "util";
import { StepWizardChildProps } from "../Providers/MyStepWizard";

const Btn = styled(Button)(({ theme }) => ({
  "& svg, & svg.SvgIcon-root": {
    width: "30px",
    height: "30px",
  },
}));

const DefaultWizardNav: FC<any> = (props: StepWizardChildProps) => {
  return (
    <Stack direction={"column"}>
      <Stack
        direction={"row"}
        sx={{ alignSelf: "flex-end", mt: "7px" }}
        spacing={"4px"}
      >
        <Btn
          startIcon={<WestIcon />}
          disabled={props.currentStep <= 1}
          onClick={() => {
            props.previousStep();
          }}
        >
          Назад
        </Btn>
        <Btn
          endIcon={<EastIcon />}
          disabled={props.currentStep >= props.totalSteps}
          onClick={() => {
            props.nextStep();
          }}
        >
          Вперёд
        </Btn>
      </Stack>
    </Stack>
  );
};
export default DefaultWizardNav;
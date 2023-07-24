import { Button, Stack, Box, styled } from "@mui/material";
import React, { useRef, useEffect, FC } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import util from "util";
import StepWizard, {
  StepWizardProps,
  StepWizardChildProps,
} from "react-step-wizard";
import { useWizard } from "./Providers/WizardProvider";

const Btn = styled(Button)(({ theme }) => ({
  "& svg, & svg.SvgIcon-root": {
    width: "30px",
    height: "30px",
  },
}));

const WizardNav: FC<any> = (props: StepWizardChildProps) => {
  const { isLastStep, setIsLastStep } = useWizard();
  return (
    <Stack
      direction={"row"}
      sx={{ alignSelf: "flex-end", mt: "20px" }}
      spacing={"4px"}
    >
      <Btn
        startIcon={<WestIcon />}
        disabled={props.currentStep <= 1}
        onClick={() => {
          if (isLastStep) {
            setIsLastStep(false);
          }
          props.goToStep(1);
        }}
      >
        Назад
      </Btn>
      <Btn endIcon={<EastIcon />} onClick={() => setIsLastStep(true)}>
        Вперёд
      </Btn>
    </Stack>
  );
};
export default WizardNav;

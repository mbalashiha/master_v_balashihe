import React, { useRef, useEffect, FC } from "react";
import Image from "next/image";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  styled,
} from "@mui/material";

type GridContainerProps = React.ComponentProps<typeof Grid>;
import util from "util";
import { FormikProps } from "formik";

const GridItemSidebar = ({ children, sx, ...rest }: GridContainerProps) => {
  return (
    <Grid
      item
      xs={12}
      md={3}
      sx={{
        p: "10px",
        background: (theme) => theme.palette.background.paper,
        "& img": {
          borderRadius: "100%",
        },
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {children}
    </Grid>
  );
};
type PreStepWizardProps = Partial<{
  className: string;
  hashKey: string;
  stepName: string;
  initialStep: number;
  instance: (wizard: StepWizardProps) => void;
  isHashEnabled: boolean;
  isLazyMount: boolean;
  nav: JSX.Element;

  onStepChange: (stepChange: {
    previousStep: number;
    activeStep: number;
  }) => void;

  transitions: {
    enterRight?: string;
    enterLeft?: string;
    exitRight?: string;
    exitLeft?: string;
    intro?: string;
  };

  form?: JSX.Element | React.ReactElement;
  children: JSX.Element | JSX.Element[] | React.ReactElement;
  sidebar?: JSX.Element | React.ReactElement;
  title?: React.ReactNode | React.ReactNode[];
}>;

export type StepWizardChildProps<T extends Record<string, any> = {}> = {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  progressPercents: number;
  firstStep: () => void;
  lastStep: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  goToNamedStep: (step: string) => void;
  hashKey?: string;
  stepName?: string;
  showOnlyStep?: boolean;
  noSidebar?: boolean;
  noNavigation?: boolean;
  noTitle?: boolean;
} & T;

export type StepWizardProps = React.ComponentProps<typeof Grid> &
  PreStepWizardProps;
const MyStepWizard = ({
  children,
  stepName: inStepName,
  initialStep,
  nav,
  hashKey,
  instance,
  isHashEnabled,
  isLazyMount,
  onStepChange,
  transitions,
  sidebar,
  title,
  sx,
  form,
  ...rest
}: StepWizardProps) => {
  const collectedStepsNames = new Map<
    string,
    {
      index: number;
      props: Partial<StepWizardChildProps>;
      step: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    }
  >();
  const collectedSteps = new Map<
    number,
    {
      props: Partial<StepWizardChildProps>;
      step: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    }
  >();
  let totalSteps: number = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      totalSteps++;
      const props: any = child.props || {};
      if (props.stepName && typeof props.stepName === "string") {
        collectedStepsNames.set(props.stepName, {
          index: totalSteps,
          props: { ...props },
          step: child,
        });
      }
      collectedSteps.set(totalSteps, {
        props: { ...props },
        step: child,
      });
    }
  });
  const [currentStep, __setCurrentStep] = React.useState<number>(
    initialStep || 1
  );
  const [progressPercents, setProgressPercents] = React.useState<number>(
    (currentStep / (totalSteps || 1)) * 100
  );
  const setCurrentStep = (step: number): void => {
    __setCurrentStep(step);
    setProgressPercents((step / (totalSteps || 1)) * 100);
  };
  const goToNamedStep = (step: string): void => {
    const namedStepIndex = collectedStepsNames.get(step)?.index;
    if (namedStepIndex) {
      setCurrentStep(namedStepIndex);
    }
  };
  const goToStep = (step: number): void => {
    if (collectedSteps.get(step)) {
      setCurrentStep(step);
    }
  };
  const nextStep = (): void => {
    if (collectedSteps.get(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };
  const previousStep = (): void => {
    if (collectedSteps.get(currentStep - 1)) {
      setCurrentStep(currentStep - 1);
    }
  };
  const firstStep = () => {
    setCurrentStep(1);
  };
  const lastStep = () => {
    setCurrentStep(totalSteps);
  };
  const selectedStepEntry = collectedSteps.get(currentStep)! || {};
  const {
    step: selectedStep,
    props: { noSidebar, noNavigation, noTitle, showOnlyStep, stepName },
  } = selectedStepEntry;
  const getClonedElementProps = () => ({
    isActive: true,
    currentStep,
    totalSteps,
    firstStep,
    lastStep,
    nextStep,
    previousStep,
    goToStep,
    goToNamedStep,
    progressPercents,
    stepName,
  });
  sidebar =
    sidebar && !showOnlyStep && !noSidebar
      ? React.cloneElement(sidebar, getClonedElementProps())
      : undefined;
  title = title && !showOnlyStep && !noTitle ? title : undefined;
  nav =
    (nav &&
      !showOnlyStep &&
      !noNavigation &&
      React.cloneElement(nav, getClonedElementProps())) ||
    undefined;
  return (
    <Grid
      container
      sx={{
        ...sx,
      }}
      {...rest}
    >
      <Grid
        item
        xs={12}
        md={sidebar ? 9 : 12}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: { xs: "7px", lg: "17px 20px" },
          "& form": {
            height: "100%",
            flexGrow: 1,
          },
        }}
      >
        {title && (
          <Typography
            sx={{
              "&&&": {
                display: "block",
                fontSize: { xs: "20px", md: "25px" },
                lineHeight: { xs: "23px", md: "28px" },
                p: { xs: "0 27px 12px 0", lg: "0 20px 12px 0" },
                fontWeight: 500,
              },
            }}
          >
            Ответьте на пару вопросов и получите скидку 25%
          </Typography>
        )}
        <Box
          sx={{
            flexGrow: 1,
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {selectedStep && form
            ? React.cloneElement(
                form,
                getClonedElementProps(),
                React.cloneElement(selectedStep, getClonedElementProps())
              )
            : selectedStep
            ? React.cloneElement(selectedStep, getClonedElementProps())
            : undefined}
        </Box>
        {nav}
      </Grid>
      {sidebar && (
        <Grid
          item
          xs={12}
          md={3}
          sx={{ background: (theme) => theme.palette.background.paper }}
        >
          {sidebar}
        </Grid>
      )}
    </Grid>
  );
};
export default MyStepWizard;

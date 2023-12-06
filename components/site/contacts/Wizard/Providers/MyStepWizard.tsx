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

import DefaultWizardNav from "./DefaultWizardNav";

type PreStepWizardProps = Partial<{
  className: string;
  hashKey: string;
  stepName: string;
  initialStep: number;
  instance: (wizard: StepWizardProps) => void;
  isHashEnabled: boolean;
  isLazyMount: boolean;
  nav: JSX.Element;
  StepContainerProps?: React.ComponentProps<typeof Grid>;

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
  nextStepName: string | null;
  nextStepIndex: number | null;
  setNextStepName: React.Dispatch<React.SetStateAction<string | null>>;
  setNextStepIndex: React.Dispatch<React.SetStateAction<string | null>>;
  stepsHistory: Array<number>;
  goBackward: () => void;
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
  StepContainerProps,
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
  const [nextStepName, setNextStepName] = React.useState<string | null>(null);
  const [nextStepIndex, setNextStepIndex] = React.useState<number | null>(null);
  const [stepsHistory, setStepsHistory] = React.useState<Array<number>>([]);
  const [currentStep, __setCurrentStep] = React.useState<number>(
    initialStep || 1
  );
  const [progressPercents, setProgressPercents] = React.useState<number>(
    (currentStep / (totalSteps || 1)) * 100
  );
  const setCurrentStep = (nextStepIndex: number): void => {
    if (nextStepIndex > totalSteps) {
      return;
    }
    setNextStepName(null);
    setNextStepIndex(null);
    const newStepHistory = stepsHistory
      .concat(currentStep)
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
    newStepHistory.sort();
    setStepsHistory(newStepHistory);
    __setCurrentStep(nextStepIndex);
    setProgressPercents((nextStepIndex / (totalSteps || 1)) * 100);
  };
  const goToNamedStep = (step: string): void => {
    const namedStepIndex = collectedStepsNames.get(step)?.index;
    if (namedStepIndex) {
      setCurrentStep(namedStepIndex);
    } else {
      console.error("Incorrect step name: " + step);
    }
  };
  const goBackward = () => {
    const prevElement = stepsHistory[stepsHistory.length - 1];
    const backStep =
      prevElement &&
      prevElement < currentStep &&
      collectedSteps.has(prevElement)
        ? prevElement
        : currentStep > 1
        ? 1
        : false;
    if (backStep) {
      setCurrentStep(backStep);
    }
  };
  const goToStep = (step: number): void => {
    if (collectedSteps.get(step)) {
      setCurrentStep(step);
    }
  };
  const nextStep = (): void => {
    if (nextStepName) {
      goToNamedStep(nextStepName);
    } else if (nextStepIndex) {
      setCurrentStep(nextStepIndex);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  const previousStep = goBackward;
  const firstStep = () => {
    setCurrentStep(1);
  };
  const lastStep = () => {
    setCurrentStep(totalSteps);
  };
  const selectedStepEntry = collectedSteps.get(currentStep)! || { props: {} };
  const {
    step: selectedStep,
    props: { noSidebar, noNavigation, noTitle, showOnlyStep, stepName },
  } = selectedStepEntry;
  const getClonedElementProps = () => ({
    isActive: true,
    totalSteps,
    progressPercents,
    nextStepName,
    nextStepIndex,
    setNextStepName,
    setNextStepIndex,
    stepsHistory,
    goBackward,
    firstStep,
    lastStep,
    nextStep,
    previousStep,
    goToStep,
    goToNamedStep,
    currentStep,
  });
  sidebar =
    sidebar && !showOnlyStep && !noSidebar
      ? React.cloneElement(sidebar, getClonedElementProps())
      : undefined;
  title = title && !showOnlyStep && !noTitle ? title : undefined;
  nav =
    (!showOnlyStep &&
      !noNavigation &&
      React.cloneElement(
        nav || <DefaultWizardNav />,
        getClonedElementProps()
      )) ||
    undefined;
  return (
    <>
      {!sidebar ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& form": {
              height: "100%",
              flexGrow: 1,
            },
            ...StepContainerProps?.sx,
          }}
        >
          {title && (
            <Typography
              variant="h1"
              sx={{
                "&&&": {
                  display: "block",
                  fontSize: { xs: "20px", md: "25px" },
                  lineHeight: { xs: "23px", md: "28px" },
                  fontWeight: 400,
                  fontFamily: `var(--text-font-family)`,
                },
                mb: "5px",
              }}
            >
              {title}
            </Typography>
          )}
          <Box
            sx={{
              flexGrow: 1,
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
        </Box>
      ) : (
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
            {...StepContainerProps}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& form": {
                height: "100%",
                flexGrow: 1,
              },
              ...StepContainerProps?.sx,
            }}
          >
            {title && (
              <Typography
                variant="h1"
                sx={{
                  "&&&": {
                    display: "block",
                    fontSize: { xs: "20px", md: "25px" },
                    lineHeight: { xs: "23px", md: "28px" },
                    fontWeight: 500,
                  },
                  mb: "5px",
                }}
              >
                {title}
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
      )}
    </>
  );
};
export default MyStepWizard;

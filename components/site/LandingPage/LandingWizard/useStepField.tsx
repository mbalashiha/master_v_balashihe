import { WizValues } from "@components/site/contacts/Wizard/Providers";
import { useField } from "formik";
import React, { useRef } from "react";

interface Props {
  nextStepName: string | null;
  goToNamedStep: (step: string) => void;
  stepName: string;
  setNextStepName: React.Dispatch<React.SetStateAction<string | null>>;
  getNextStep: (value: string | null) => string | null;
}

export default function useStepField({
  stepName,
  nextStepName,
  goToNamedStep,
  setNextStepName,
  getNextStep,
}: Props) {
  const propsRef = React.useRef({ nextStepName, goToNamedStep });
  propsRef.current = { nextStepName, goToNamedStep };
  const [field, meta] = useField<string>(stepName);
  const { name, value } = field;
  React.useEffect(() => {
    setNextStepName((field.value && getNextStep(field.value as any)) || null);
  }, [field.value, setNextStepName, getNextStep]);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const onChange: typeof field.onChange = (event: {
    target: { value: string | null };
  }) => {
    const nextStepName = getNextStep(event.target.value as any);
    if (nextStepName) {
      field.onChange(event);
      if (!timeoutIdRef.current) {
        timeoutIdRef.current = setTimeout(() => {
          timeoutIdRef.current = null;
          const { nextStepName, goToNamedStep } = propsRef.current;
          if (nextStepName) {
            goToNamedStep(nextStepName);
          }
        }, 300);
      }
    }
  };
  const onClick = () => {
    if (field.value && !timeoutIdRef.current) {
      timeoutIdRef.current = setTimeout(() => {
        timeoutIdRef.current = null;
        const { nextStepName, goToNamedStep } = propsRef.current;
        if (nextStepName) {
          goToNamedStep(nextStepName);
        }
      }, 100);
    }
  };
  return { onChange, onClick, name, value, field, meta };
}

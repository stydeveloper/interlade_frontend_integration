import { useState } from "react";

export function useMultistepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (index) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex !== 0,
    isGenerateStep: currentStepIndex === steps.length - 2,
    isLastStep: currentStepIndex === steps.length - 1
  };
}

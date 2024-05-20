import React, { useMemo, useState } from "react";

const MuliStepForm = ({ componentList }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepsCount = componentList.length;

  const handleNextStep = () => {
    if (currentStep + 1 < componentList.length) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleCurrentStep = (index) => {
    setCurrentStep(index);
  };

  const progressLength = useMemo(() => {
    return (100 / (stepsCount - 1)) * currentStep;
  }, [currentStep]);

  return (
    <div className="w-full max-w-screen-md border-2 border-blue-300 p-5">
      <div className="step-inidcator mb-10 flex justify-between w-full border-3 border-cyan-50 relative">
        {componentList?.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => handleCurrentStep(index)}
              className="w-5 h-5 rounded-full bg-lime-400 p-5 flex justify-center items-center z-10 font-bold"
            >
              {index + 1}
            </button>
          );
        })}
        <div
          className="step-progress absolute top-[50%] h-1 bg-lime-600 "
          style={{ width: `${progressLength}%` }}
        ></div>
      </div>
      <div className="active-component flex justify-center">
        {componentList[currentStep]}
      </div>
    </div>
  );
};

export default MuliStepForm;

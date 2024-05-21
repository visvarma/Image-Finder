import React, { useMemo, useState } from "react";

const MultiStepForm = ({ componentList }) => {
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
    <div className="w-full max-w-screen-lg border border-gray-700 p-5 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col">
      <div className="step-indicator mb-10 flex justify-between w-full relative">
        {componentList?.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCurrentStep(index)}
            className={`w-10 h-10 rounded-full flex justify-center items-center z-10 font-bold ${
              currentStep >= index
                ? "bg-teal-500 text-white"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <div
          className="step-progress absolute top-1/2 transform -translate-y-1/2 h-1 bg-teal-500"
          style={{ width: `${progressLength}%` }}
        ></div>
      </div>
      <div className="active-component flex justify-center bg-gray-800 p-6 rounded-lg shadow-inner flex-grow">
        {componentList[currentStep]}
      </div>
    </div>
  );
};

export default MultiStepForm;

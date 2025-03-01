import React from "react";

const MultiStepFormbar = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          {/* Step Indicator */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold 
        ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"}`}
          >
            {index + 1}
          </div>

          {/* Step Title */}
          <div
            className={`ml-2 text-sm font-medium ${
              index <= currentStep ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {step.title}
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                index < currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiStepFormbar;

import React from "react";
// import "./Stepper.css";
const Stepper = () => {
  const steps = ["Customer Info", "Shipping info", "Payment"];
  return (
    <div className="grid justify-between gap-3">
      {steps.map((step, index) => (
        <div className="step-item" key={index}>
          <div className="step">{index + 1}</div>
          <p className="text-gray-500">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;

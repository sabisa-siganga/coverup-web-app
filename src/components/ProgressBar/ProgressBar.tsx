"use client";

import React, { useState } from "react";
import "./ProgressBar.scss";
import Link from "next/link";

interface Props {
  currentStep: number;
  className?: string;
}

const steps = [
  "ID number",
  "Profile Details",
  "Policy Details ",
  "Select Extras",
  "Cover Options",
  // "Payment",
];

const ProgressBar = (props: Props) => {
  const { currentStep, className } = props;

  return (
    <div className={`progress-step-bar ${className}`}>
      <div className="step-items-list flex justify-between">
        {steps?.map((step, index) => (
          <div
            key={index}
            className={`step-item ${
              currentStep === index + 1 ? "active" : ""
            } ${currentStep > index + 1 ? "completed" : ""}`}
          >
            <div className="step">{index + 1}</div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

import React from 'react'
import './jobcard.scss'

export const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className='stepIndicator'>
      {steps.map((step, index) => (
        <div key={index} className={`step ${index <= currentStep ? "active " : "step-reverse"}`}>
          {step}
        </div>
      ))}
    </div>
  )
}

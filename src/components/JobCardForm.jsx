import React, { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema, initialValues } from '../utils';
import { StepIndicator, ClientInformation, MachineDetails, MachineCondition, SummaryConfirmation } from './index';

const steps = [
  '1. Client Information',
  '2. Specification Details',
  '3. Summary & Confirmation',
];

export const JobCardForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here (e.g., send data to server)
      console.log('Form submitted with values:', values);
    },
  });

  const handleChange = formik.handleChange;
  const errors = formik.errors;

  const handlePhotoChange = (event) => {
    // ... (same photo handling logic)
  };

  const previewImage = (file) => {
    // ... (same image preview logic)
  };

  const handleNext = () => {
    // Validate all fields relevant to the current step based on errors
    const currentStepErrors = Object.keys(errors)
      .filter((field) => field.startsWith(steps[currentStep].slice(3).toLowerCase())) // Filter based on current step field prefix
      .map((field) => errors[field]);

    const hasErrors = currentStepErrors.some((error) => error !== ''); // Check if any error exists

    if (!hasErrors) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate if the "Next" button should be disabled
  const isNextDisabled = currentStep === 1 ? !formik.isValid : errors; // Check for validation errors in the current step

  return (
    <div className="job-card-container">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="form">
        {currentStep === 0 && (
          <ClientInformation formData={formik.values} errors={errors} handleChange={handleChange} />
        )}
        {currentStep === 1 && (
          <MachineDetails
            formData={formik.values}
            errors={errors}
            handleChange={handleChange}
            handlePhotoChange={handlePhotoChange}
          />
        )}
        {currentStep === 2 && (
          <SummaryConfirmation formData={formik.values} errors={errors} />
        )}
      </div>

      <div className="buttons">
        {currentStep > 0 && <button onClick={handleBack}>Back</button>}
        {currentStep === steps.length - 1 && (
          <button type="submit" onClick={formik.handleSubmit}>
            Submit
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button onClick={handleNext} disabled={isNextDisabled}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

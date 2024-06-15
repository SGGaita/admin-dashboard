import React, { useEffect } from 'react'
import './jobcard.scss'


export const SummaryConfirmation = ({ formData}) => {


  useEffect(() => {
    console.log('Summary', formData)
  }, [])

  return (
    <div className="form-container">
      <h2>Job Card Summary</h2>

      <div className="client-summary">
        <h3>Client Information Summary</h3>
        <div className="details">
          <div className="item">
            <span className="label">Client's name:</span>
            <span className="info-data"> {formData?.name}</span>
          </div>

          <div className="item">
            <span className="label">Email:</span>
            <span className="info-data"> {formData?.email}</span>
          </div>

          <div className="item">
            <span className="label">Phone number:</span>
            <span className="info-data">{formData?.phone}</span>
          </div>

        </div>
      </div>

      <div className="machine-summary">
        <div className="details-summary">
          <h3>Specification Summary</h3>

          <div className="details">
            <div className="item">
              <span className="label">Equipement Make:</span>
              <span className="info-data"> {formData?.make}</span>
            </div>

            <div className="item">
              <span className="label">Equipement Model:</span>
              <span className="info-data"> {formData?.model}</span>
            </div>

            <div className="item">
              <span className="label">Equipement Serial:</span>
              <span className="info-data"> {formData?.serial}</span>
            </div>

            
          </div>
        </div>

        <div className="condition-desc">
          <h3>Fault/Condition Description</h3>
        </div>
      </div>


    </div>
  )
}

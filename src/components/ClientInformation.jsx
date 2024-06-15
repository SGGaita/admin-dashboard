import React, {useState} from 'react';

export const ClientInformation = ({ formData,  setFormData, errors, handleChange,onUpdate }) => {
 

  return (
   <div className="form-container">
      <h2>Client Information</h2>

      <div className="input-elements">
        <label htmlFor="name">Full Name</label>
        <input
          name="name"
          placeholder="Provide client's full name"
          value={formData.name || ""}
          onChange={handleChange}
          required
         
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="input-elements">
        <label htmlFor="name">Email</label>
        <input
          name="email"
          placeholder="Provide client's email"
          value={formData.email || ""}
          onChange={handleChange}
          required
          // Apply error class conditionally
        />
        {errors.email && (
          <p className="error-message">{errors.email}</p>
        )}
      </div>

      <div className="input-elements">
        <label htmlFor="name">Phone number</label>
        <input
          name="phoneNumber"
          placeholder="Provide client's Phone number"
          value={formData.phoneNumber || ""}
          onChange={handleChange}
          required
           // Apply error class conditionally
        /> 
        {errors.phoneNumber && (
          <p className="error-message">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  );
};


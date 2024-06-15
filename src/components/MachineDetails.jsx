import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';


export const MachineDetails = ({ formData, errors, handleChange, handlePhotoChange, previewImage }) => {
  const [activeItem, setActiveItem] = useState(''); // Initial active item


  useEffect(() => {
    console.log("Machine details", formData)
  }, [])

  const handleAccordionClick = (itemName) => {
    if (itemName === activeItem) {
      // Close the currently active item if clicked again
      setActiveItem('');
    } else {
      // Open a new item and close the previously active one
      setActiveItem(itemName);
    }
  };



  const handleFileChange = (event) => {
    const { name, files } = event.target;
    // Handle file upload logic here (e.g., preview image, store file data)
    // onUpdate({ ...formData.machineDetails, [name]: files[0] }); // Update with the first selected file (assuming single upload)
  };

  const renderAccordionItem = (itemName, content) => (
    <div className="accordion" key={itemName}>
      <div className="accordion-title" onClick={() => handleAccordionClick(itemName)}>
        {itemName}
        <FontAwesomeIcon
          icon={activeItem === itemName ? faMinus : faPlus}
          className={`icon ${activeItem === itemName ? 'open' : ''}`}
        />
      </div>
      {activeItem === itemName && (
        <div className="accordion-content" style={{ transition: 'max-height 0.3s ease-in-out' }}>
          {content}
        </div>
      )}
    </div>
  );


  return (
    <div className="form-container">
      <h2>Specification Details</h2>



      <div className="input-elements">
        <label htmlFor="make">Equipment Make</label>
        <input
          name="make"
          placeholder="Enter equipment make"
          value={formData.make || ""}
          onChange={handleChange}
          required

        />
        {errors.make && <p className="error-message">{errors.make}</p>}
      </div>

      <div className="input-elements">
        <label htmlFor="model">Equipment model</label>
        <input
          name="model"
          placeholder="Enter equipment model"
          value={formData.model || ""}
          onChange={handleChange}
          required
        />
        {errors.model && <p className="error-message">{errors.model}</p>}
      </div>

      <div className="input-elements">
        <label htmlFor="model">Equipment Serial No.</label>
        <input
          name="serial"
          placeholder="Enter equipment serial number"
          value={formData.serial || ""}
          onChange={handleChange}
          required
        />
        {errors.serial && <p className="error-message">{errors.serial}</p>}
      </div>

      <div className="input-elements">
        <label htmlFor="equipmentPhoto">Attach Photo (Max 2MB)</label>
        <input

          className='image-upload'
          type="file"
          //id="equipmentPhoto"
          name="equipmentPhoto"
          accept="image/*"
          onChange={handlePhotoChange}
          required

        />
        {errors.equipmentPhoto && <p className="error-message">{errors.equipmentPhoto}</p>}
        {/* <div id="photoPreview"></div>  */}

      </div>








      <h2 className="key-components-heading">Key Components</h2>
      <div className="accordion-container">
        {renderAccordionItem('HDD/SSD', (
          <div className="input-elements-accordion">
            <label htmlFor="hddSerial">HDD/SSD Serial no.</label>
            <input
              name="hddSerial"
              placeholder="Enter serial number"
              value={formData?.hddSerial || ""}
              onChange={handleChange}
              required
            />
            {errors.hddSerial && <p className="error-message">{errors.hddSerial}</p>}
            <div className="accordion-images">
              <div className="input-image-accordion">
                <label for="hddPhoto">Attach front photo</label>
                <input type="file" id="hddPhoto" name="hddPhoto" accept="image/*" onChange={handleFileChange} />
              </div>

              <div className="input-image-accordion">
                <label for="hddPhotoBack">Attach back photo</label>
                <input type="file" id="hddPhotoBack" name="hddPhoto" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

          </div>



        ))}
        {renderAccordionItem('RAM', (

          <div className="input-elements-accordion">
            <label htmlFor="ramSerial">RAM Serial no.</label>
            <input
              name="ramSerial"
              placeholder="Enter RAM serial number"
              value={formData?.ramSerial || ""}
              onChange={handleChange}
              required
            />
            {errors.ramSerial && <p className="error-message">{errors.ramSerial}</p>}

            <div className="accordion-images">
              <div className="input-image-accordion">
                <label for="ramPhoto">Attach front photo</label>
                <input type="file" id="ramPhoto" name="ramtPhoto" accept="image/*" onChange={handleFileChange} />
              </div>

              <div className="input-image-accordion">
                <label for="ramPhotoBack">Attach back photo</label>
                <input type="file" id="ramPhotoBack" name="ramPhotoBack" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

          </div>

        ))}
        {renderAccordionItem('ROM', (
          <div className="input-elements-accordion">
            <label htmlFor="romSerial">Serial no.</label>
            <input
              name="romSerial"
              placeholder="Enter ROM serial number"
              value={formData?.romSerial || ""}
              onChange={handleChange}
              required
            />
            {errors.romSerial && <p className="error-message">{errors.romSerial}</p>}
            <div className="accordion-images">
              <div className="input-image-accordion">
                <label for="equipmentPhoto">Attach front photo</label>
                <input type="file" id="equipmentPhoto" name="equipmentPhoto" accept="image/*" onChange={handleFileChange} />
              </div>

            </div>

          </div>
        ))}
        {renderAccordionItem('Adapter', (
          <div className="input-elements-accordion">
            <label htmlFor="adapterSerial">Serial no.</label>
            <input
              name="adapterSerial"
              placeholder="Enter adapter serial number"
              value={formData?.adapterSerial || ""}
              onChange={handleChange}
              required
            />
            {errors.adapterSerial && <p className="error-message">{errors.adapterSerial}</p>}
            <div className="accordion-images">
              <div className="input-image-accordion">
                <label for="adapterPhoto">Attach photo</label>
                <input type="file" id="adapterPhoto" name="adapterPhoto" accept="image/*" onChange={handleFileChange} />
              </div>

            </div>

          </div>
        ))}
        {renderAccordionItem('3 Pin', (
          <div className="input-elements-accordion">
            <label htmlFor="pinSerial">Serial no.</label>
            <input
              name="pinSerial"
              placeholder="Enter serial number"
              value={formData.pinSerial || ""}
              onChange={handleChange}
              required
            />
            {errors.pinSerial && <p className="error-message">{errors.pinSerial}</p>}
            <div className="accordion-images">
              <div className="input-image-accordion">
                <label for="pinSerialPhoto">Attach front photo</label>
                <input type="file" id="pinSerialPhoto" name="pinSerialPhoto" accept="image/*" onChange={handleFileChange} />
              </div>

            </div>

          </div>
        ))}
        {renderAccordionItem('Battery', (
          <div className="input-elements-accordion">
            <label htmlFor="battery">Serial no.</label>
            <input
              name="battery"
              placeholder="Enter serial number"
              value={formData.battery || ""}
              onChange={handleChange}
              required
            />
            {errors.batterySerial && <p className="error-message">{errors.batterySerial}</p>}
            <div className="accordion-images">
              <div className="input-image-accordion">
                <label for="equipmentPhoto">Attach front photo</label>
                <input type="file" id="batteryPhoto" name="batteryPhoto" accept="image/*" onChange={handleFileChange} />
              </div>

            </div>

          </div>
        ))}
      </div>

      <h3>Fault/Condition Description</h3>

      <textarea className="machine-condition "
        name='condition'
        value={formData.condition || ""}
        onChange={handleChange}
        rows={10} placeholder='Provide the precise state of the machine.' />
        {errors.condition && <p className="error-message">{errors.condition}</p>}
    </div>
  );
};

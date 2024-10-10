import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import "../style/webcam.css";

const WebcamCapture = ({ onSubmitProfile }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    jobTitle: "",
    company: "",
    email: "",
    email2: "", // Added email2 field
    phone: "",
  });

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCapturedImage(reader.result); // Set the uploaded image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!capturedImage || !profileDetails.name || !profileDetails.jobTitle) {
      alert("Please fill in all fields and capture/upload an image.");
      return;
    }
    onSubmitProfile({
      ...profileDetails,
      photo: capturedImage,
    });
  };

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-feed"
      />
      <button className="capture-btn" onClick={captureImage}>
        Capture Photo
      </button>
      
      {/* New Upload Image Section */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginTop: '10px' }}
      />

      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured or Uploaded"
          style={{ marginTop: '10px', width: '100%', maxWidth: '400px', height: 'auto' }}
        />
      )}

      <div className="profile-details-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profileDetails.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={profileDetails.jobTitle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={profileDetails.company}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profileDetails.email}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email2"
          placeholder="Email to send" // New email2 field
          value={profileDetails.email2}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={profileDetails.phone}
          onChange={handleChange}
        />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Profile
      </button>
    </div>
  );
};

export default WebcamCapture;

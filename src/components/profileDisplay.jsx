import React from "react";
import "../style/profileDisplay.css";

const ProfileDisplay = ({ profile }) => {
  const sendEmail = async () => {
    const response = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to_email: profile.email,
        to_email2: profile.email2,
        image_data: profile.photo,
        profile_details: {
          name: profile.name,
          jobTitle: profile.jobTitle,
          company: profile.company,
          email: profile.email,
          email2: profile.email2,
          phone: profile.phone,
        },
      }),
    });

    if (response.ok) {
      alert("Emails sent successfully!");
    } else {
      alert("Failed to send emails. Please try again.");
    }
  };

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="profile-display">
      {profile.photo ? (
        <img src={profile.photo} alt="Captured Profile" className="profile-photo" />
      ) : (
        <div className="profile-photo" style={{ backgroundColor: "#f0f0f0", borderRadius: "50%" }}>
          No Image Available
        </div>
      )}
      <h2>{profile.name || "Name not available"}</h2>
      <p><strong>Job Title:</strong> {profile.jobTitle || "Not provided"}</p>
      <p><strong>Company:</strong> {profile.company || "Not provided"}</p>
      <p><strong>Email:</strong> {profile.email || "Not provided"}</p>
      <p><strong>Email2:</strong> {profile.email2 || "Not provided"}</p>
      <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>

      <div className="button-container">
        <button className="action-button" onClick={sendEmail}>
          Send Profile via Email
        </button>
      </div>
    </div>
  );
};

export default ProfileDisplay;

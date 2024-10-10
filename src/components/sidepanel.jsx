/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; 
import '../style/sidepanel.css';

const SidePanel = ({ side }) => {
  return (
    <div className={`side-panel ${side}`}>
      <div>
        {side === "left" && (
          <>
            <p>
            <h2>About our project</h2>
            This project allows users to capture their images using a webcam, input their 
              personal details, and send their profile information via email. 
              Users can easily share their profiles along with their captured images, making it 
              an efficient way to connect and share personal information.
            </p>
            
            <p>
              <h2>Key Features</h2>
              Real-time image capture using webcam.
                Form for entering personal details like name, job title, company, and contact information.
                Email functionality to send profiles and images to specified email addresses.
            </p>
          </>
        )}
        {side === "right" && (
          <>
            
            <p>
            <h2>About our Project</h2>
            Our project leverages technology to foster collaboration and improve community service initiatives. 
              Through our platform, we encourage individuals to engage actively and contribute to societal development 
              while enhancing their personal growth and learning.
            </p>
            <p>
              <h2>Feedback and Support</h2>
              Feedback and Improvement: We actively seek feedback from our users to continually improve our platform and offerings. 
              This ensures that we remain responsive to the needs of both volunteers and community organizations.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

SidePanel.propTypes = {
  side: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default SidePanel;

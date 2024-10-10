import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "praveenkumartv@student.tce.edu", 
    pass: "ilsm zxdk duti lhcg", 
  },
});

// Email sending function
const sendEmail = async (to_email, to_email2, image_data, profile_details) => {
  if (!to_email || !image_data || !profile_details) {
    throw new Error('Missing email, image data, or profile details');
  }

  const recipients = [to_email, to_email2];  // Handle sending to both emails

  // Forming a descriptive paragraph with profile details
  const profileParagraph = `
    <p>Dear User,</p>
    <p>I am pleased to share my profile details with you. My name is <strong>${profile_details.name}</strong>, 
    and I currently hold the position of <strong>${profile_details.jobTitle}</strong> at <strong>${profile_details.company}</strong>.</p>
    <p>For further communication, my alternate email address is <strong>${profile_details.email}</strong>, 
    and your contact number is <strong>${profile_details.phone}</strong>.</p>
    <p>Please let me know if there are any updates or changes.</p>
    <p>Best regards,<br>${profile_details.name}</p>
  `;

  // Email options for sending profile details as a paragraph
  const detailsMailOptions = {
    from: "praveenkumartv@student.tce.edu",
    to: recipients,
    subject: 'Your Profile Details',
    html: profileParagraph,
  };

  // Email options for sending the captured image
  const imageMailOptions = {
    from: "praveenkumartv@student.tce.edu",
    to: recipients,
    subject: 'Your Captured Image',
    html: `
      <h3>Your Captured Photo:</h3>
      <img src="${image_data}" alt="Captured Profile" style="width: 150px; height: auto;"/>
    `,
    attachments: [
      {
        filename: 'custom-image.png',
        content: image_data.split('base64,')[1],
        encoding: 'base64',
      },
    ],
  };

  // Send both emails
  await transporter.sendMail(detailsMailOptions);
  await transporter.sendMail(imageMailOptions);
};

// Endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { to_email, to_email2, image_data, profile_details } = req.body;

  try {
    await sendEmail(to_email, to_email2, image_data, profile_details);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Failed to send emails');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

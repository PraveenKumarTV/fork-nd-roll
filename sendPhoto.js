import nodemailer from 'nodemailer';

const sendPhoto = async (to_email, image_data) => {
  if (!to_email || !image_data) {
    throw new Error('Missing email or image data');
  }

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "praveenkumartv@student.tce.edu", 
      pass: "ilsm zxdk duti lhcg", 
    },
  });

  
  const mailOptions = {
    from: "praveenkumartv@student.tce.edu",
    to: to_email,
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

  try {
    await transporter.sendMail(mailOptions);
    console.log('Captured image email sent');
  } catch (error) {
    console.error('Error sending image email:', error);
    throw new Error('Failed to send image email');
  }
};

export default sendPhoto;

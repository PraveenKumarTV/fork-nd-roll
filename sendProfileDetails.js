import nodemailer from 'nodemailer';

const sendProfileDetails = async (to_email, profile_details) => {
  if (!to_email || !profile_details) {
    throw new Error('Missing email or profile details');
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
    subject: 'Your Profile Details',
    html: `
      <h3>Here are your profile details:</h3>
      <p><strong>Name:</strong> ${profile_details.name}</p>
      <p><strong>Job Title:</strong> ${profile_details.jobTitle}</p>
      <p><strong>Company:</strong> ${profile_details.company}</p>
      <p><strong>Email:</strong> ${profile_details.email}</p>
      <p><strong>Phone:</strong> ${profile_details.phone}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Profile details email sent');
  } catch (error) {
    console.error('Error sending profile details email:', error);
    throw new Error('Failed to send profile details email');
  }
};

export default sendProfileDetails;

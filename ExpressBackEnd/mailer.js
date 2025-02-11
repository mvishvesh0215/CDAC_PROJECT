const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,  // Your Gmail email
    pass: config.email.password,  // Use an App Password
  },
});

async function sendEmail(email, subject, body) {
  if (!email) {
    console.error("sendEmail error: No recipient email provided.");
    return { success: false, message: "Recipient email is missing" };
  }

  try {
    const result = await transporter.sendMail({
      from: config.email.user, // ADD SENDER EMAIL
      to: email.trim(), // Ensure email is a clean string
      subject,
      html: body,
    });

    console.log("Email sent successfully:", result.messageId);
    return { success: true, message: "Email sent successfully" };

  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, message: "Failed to send email", error: error.message };
  }
}

module.exports = {
  sendEmail,
};

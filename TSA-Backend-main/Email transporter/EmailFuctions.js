const transporter = require('./Transportersetup'); // Shared transporter

// Function to send enrollment email
const sendEnrollmentEmail = async (email, studentName, courseName) => {
  const courseEnrollmentEmail = require('./EmailTamplates/CourseEnrollmentEmail'); // HTML template
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Request Received`,
    html: courseEnrollmentEmail(studentName, courseName),
  };

  try {
    await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    throw new Error('Failed to send enrollment email');
  }
};

// Function to send session notification email
const sendSessionNotificationEmail = async (email, studentName, sessionDetails) => {
  const sessionNotificationEmail = require('./EmailTamplates/SessionEmail'); // HTML template

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Session Notification',
    html: sessionNotificationEmail(studentName, sessionDetails),
  };

  try {
    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error('Error sending session email:', error);
    throw new Error('Failed to send session notification email');
  }
};

// Function to send payment confirmation email
const sendPaymentConfirmationEmail = async (email, Name, paymentType, amount) => {
  const paymentConfirmationEmail = require('./EmailTamplates/PaymentConfirmation'); // HTML template
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Payment Confirmation',
    html: paymentConfirmationEmail(Name, paymentType, amount),
  };

  try {
    await transporter.sendMail(mailOptions);
 
  } catch (error) {
    console.error('Error sending payment email:', error);
    throw new Error('Failed to send payment confirmation email');
  }
};

module.exports = {
  sendEnrollmentEmail,
  sendSessionNotificationEmail,
  sendPaymentConfirmationEmail,
};

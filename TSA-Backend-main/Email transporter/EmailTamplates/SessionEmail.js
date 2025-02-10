module.exports = (studentName, sessionDetails) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: left;
      color: #333333;
    }
    .content h2 {
      font-size: 22px;
      color: #007bff;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      padding: 10px;
      background: #f4f4f4;
      font-size: 14px;
      color: #777777;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Session Confirmation</h1>
    </div>
    <div class="content">
      <h2>Hello ${studentName.toUpperCase()},</h2>
      <p>
        Thank you for booking your session with TSA. We are pleased to confirm that your session has been successfully scheduled. Please see the session details below:
      </p>
      <p>
        <strong>Title:</strong> ${sessionDetails.name.toUpperCase()}<br>
        <strong>Free selfHelpCredit:</strong> ${sessionDetails.selfHelpCredit}
        <strong>Price:</strong> ₹${sessionDetails.price}
      </p>
      <p>
        Our team will be in touch with you shortly to provide further information or any assistance you may need before the session.
      </p>
      <p>
        We look forward to your participation in the session!
      </p>
    </div>
    <div class="footer">
      <p>
        Need help? Contact us at <a href="mailto:emindcafe@gmail.com">emindcafe@gmail.com</a> or visit our website.
      </p>
      <p>&copy; ${new Date().getFullYear()} Your Organization. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

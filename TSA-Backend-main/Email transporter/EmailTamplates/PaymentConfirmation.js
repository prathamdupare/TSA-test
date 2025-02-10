module.exports = (Name, paymentType, amount) => `
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
      background: #28a745;
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
      color: #28a745;
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
      color: #28a745;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Payment Confirmation</h1>
    </div>
    <div class="content">
      <h2>Hello ${Name.toUpperCase()},</h2>
      <p>
        We are pleased to inform you that your payment has been successfully received. Here are the details of the transaction:
      </p>
      <p>
        <strong>Payment Type:</strong> ${paymentType}<br>
        <strong>Amount Paid:</strong> ₹${amount}
      </p>
      <p>
        Thank you for your payment. If you have any questions or concerns, feel free to reach out to us.
      </p>
      <p>
        We appreciate your prompt payment!
      </p>
    </div>
    <div class="footer">
      <p>
        Need help? Contact us at <a href="emindcafe@gmail.com">emindcafe@gmail.com</a> or visit our website.
      </p>
      <p>&copy; ${new Date().getFullYear()} Your Organization. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

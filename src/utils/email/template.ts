export const generateOtpTemplate = (
  otpNumber: string,
  validity: number,
): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: #4CAF50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888888;
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your OTP Code</h1>
    </div>
    <div class="content">
      <p>Use the following OTP to complete your transaction:</p>
      <p class="otp">${otpNumber}</p>
      <p>This OTP is valid for ${validity} minutes.</p>
    </div>
    <div class="footer">
      <p>If you did not request this, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;

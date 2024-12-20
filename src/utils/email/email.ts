import nodemailer from 'nodemailer';
import { generateOtpTemplate } from './template';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOtpEmail = async (
  recipientEmail: string,
  otpNumber: string,
  validity: number,
) => {
  const transporter = createTransporter();

  try {
    const htmlContent = generateOtpTemplate(otpNumber, validity);

    const info = await transporter.sendMail({
      from: '"Your Service Name"',
      to: recipientEmail,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otpNumber}. It is valid for ${validity} minutes.`,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

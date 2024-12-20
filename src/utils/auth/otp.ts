export const generateOtp = (): number => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  return otp;
};

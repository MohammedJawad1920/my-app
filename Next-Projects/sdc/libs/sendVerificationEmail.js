import nodemailer from "nodemailer";

export default async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `${process.env.BASE_URL}/verify-email/${verificationToken}`;

  const expirationTime = new Date();
  expirationTime.setDate(expirationTime.getDate() + 1);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sdcvalley13@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "sdcvalley13@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the link to verify your email: ${verificationLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
}

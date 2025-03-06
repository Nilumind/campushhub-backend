import nodemailer from "nodemailer";

export const sendEmailVerification = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // Set true if using port 465 (SSL)
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click the link below to verify your email:</p>
             <a href="${verificationLink}">${verificationLink}</a>
             <p>This link will expire in 24 hours.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw new Error("Email verification failed");
  }
};
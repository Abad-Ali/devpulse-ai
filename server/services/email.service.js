import transporter from "../config/mail.js";
import {verificationEmailTemplate} from "../templates/emails/verification.email.js";
import {passwordResetEmailTemplate} from "../templates/emails/password-reset.email.js";

export const sendVerificationEmail = async ({email, name, verificationUrl}) => {
  const html = verificationEmailTemplate({name, verificationUrl});

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your DevPulse AI email",
    html,
  });
};

export const sendPasswordResetEmail = async ({email, name, resetUrl}) => {
  const html = passwordResetEmailTemplate({
    name,
    resetUrl,
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your DevPulse AI password",
    html,
  });
};
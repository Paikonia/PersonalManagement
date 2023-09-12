import { createTestAccount, createTransport } from "nodemailer";
import { config } from "dotenv";

config();
const transportCreator = () => {
  const email_user = process.env.EMAIL_USER;
  const email_pass = process.env.PASS;
  return createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
      user: email_user,
      pass: email_pass,
    },
  });
};

export const sendConfirmCode = async ({
  email,
  name,
  code,
}: {
  email: string;
  name: string;
  code: string;
}) => {
  try {
    const transporter = transportCreator()
    return await transporter.sendMail({
      from: '"Aikos Personal Management" <aikospersonalmanagement@aikosnotes.info>', // sender address
      to: email,
      subject: "Confirmation Email",
      text: `Hello ${name},
      Welcome to the Aikos personal management App. You please enter the code to confirm your email.
      Code: ${code}
      Best regards.`,
    });
  } catch (e: any) {
    const error = {
      status: 500,
      name: "Mailer Error",
      message: e.message,
    };
    throw error;
  }
};

const confirmAccountRegistration = async (
  name: string,
  email: string,
  role: string
) => {
  try {
    const transporter = transportCreator()
    return await transporter.sendMail({
      from: '"Chrysalis Support" <support@aikosnotes.info>', // sender address
      to: email, // list of receivers
      subject: "Confirmation of activation", // Subject line
      text: `Hello ${name},\n
        This email is to confirm that you have successfully registered to our database.        
        You will access resources as a ${role} in the school.
      `,
    });
  } catch (e) {
    throw e;
  }
};

export const sendResetCode = async (
  code: string,
  email: string,
  link: string,
  name: string
) => {
  try {
    const transporter = transportCreator()
    return await transporter.sendMail({
      from: '"Aikos Personal Management" <aikospersonalmanagement@aikosnotes.info>', // sender address
      to: email, // list of receivers
      subject: "Confirmation Email", // Subject line
      text: `Hello ${name},
      You have request for a password reset. Your reset code is: ${code}.

      You can also use the link: ${link} to reset your password.

      If you did not request for a password change, please ignre this email
      `,
    });
  } catch (e) {
    throw e;
  }
};

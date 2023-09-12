const { createTestAccount, createTransport } = require("nodemailer");
require('dotenv').config()



const email_user =process.env.EMAIL_USER 
const email_pass =process.env.PASS;
console.log(email_user, email_pass);
const transporter = createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: "aikospersonalmanagement@aikosnotes.info",
    pass: "NQJgGTcK0bza",
  },
});

const sendCode = async ({ email, name, code }) => {
    
  try {
    return await transporter.sendMail({
      from: '"Aikos Personal Management" <aikospersonalmanagement@aikosnotes.info>', // sender address
      to: email, // list of receivers
      subject: "Confirmation Email", // Subject line
      text: `Hello ${name},
      Welcome to the Aikos personal management App. You please enter the code to confirm your email.
      Code: ${code}
      Best regards.`,
    });
  } catch (e) {
    console.error(e)
    const error = {
      status: 500,
      name: "Mailer Error",
      message: e.message,
    };
    throw error;
  }
};

const confirmAccountRegistration = async ({ name, email, role }) => {
  try {
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

module.exports = {
    sendCode
}
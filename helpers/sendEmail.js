const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "sidorchukss86@meta.ua",
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const newEmail = {
    ...data,
    from: "sidorchukss86@meta.ua",
  };
  try {
    await transporter.sendMail(newEmail);
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const { SENDGRID_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_KEY);

// const sendEmail = async (data) => {
//   const newEmail = { ...data, from: "sidorchukss86@gmail.com" };
//   try {
//     await sgMail.send(newEmail);
//     return true;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = sendEmail;

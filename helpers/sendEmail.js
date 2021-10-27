const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const newEmail = { ...data, from: "sidorchukss86@gmail.com" };
  try {
    await sgMail.send(newEmail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

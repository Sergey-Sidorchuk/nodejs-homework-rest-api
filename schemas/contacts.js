const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneReg =
  /^[+]{1}[0-9]{2}[-]{1}[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailReg,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: phoneReg,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(emailReg).required(),
  phone: Joi.string().pattern(phoneReg).required(),
  favorite: Joi.bool().default(false),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
};

const { Conflict } = require("http-errors");
const { User } = require("../../schemas");
const { sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  if (req.body.email === null || req.body.password === null) {
    res.status(400).json({
      status: "Bad request",
      code: 400,
      message: "Ошибка от Joi или другой библиотеки  валидации",
    });
    return;
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);
  const verifyToken = nanoid();
  const newUser = new User({ email, avatarURL, verifyToken });
  newUser.setPassword(password);
  const result = await newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${verifyToken}">Нажмите для подтверждения email</a>
        `,
  };

  sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
    result,
  });
};

module.exports = register;

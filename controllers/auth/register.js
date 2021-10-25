const { Conflict } = require("http-errors");
const { User } = require("../../schemas");
const gravatar = require("gravatar");

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
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  const result = await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
    result,
  });
};

module.exports = register;

// const bcrypt = require("bcryptjs");
// const { Conflict } = require("http-errors");
// const gravatar = require("gravatar");
// const fs = require("fs/promises");
// const path = require("path");

// const { User } = require("../../schemas");

// const avatarsDir = path.join(__dirname, "../../", "public/avatars");

// const register = async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Conflict("Email in use");
//   }
//   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   const defaultAvatar = await gravatar.url(email, { s: "250" }, true);

//   const result = await User.create({
//     email,
//     password: hashPassword,
//     avatarURL: defaultAvatar,
//   });
//   const dirPath = path.join(avatarsDir, `${result._id}`);
//   await fs.mkdir(dirPath);

//   res.status(201).json({
//     status: "success",
//     code: 201,
//     message: "Registration successful",
//   });
//   return result;
// };

// module.exports = register;

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

// const register = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user) {
//     throw new Conflict("Email in use");
//   }
//   const newUser = new User({ email });
//   newUser.setPassword(password);
//   await newUser.save();

//   res.status(201).json({
//     status: "success",
//     code: 201,
//     message: "Register success",
//     result,
//   });
// };

// module.exports = register;

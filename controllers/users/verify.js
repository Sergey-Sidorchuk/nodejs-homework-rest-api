const { NotFound } = require("http-errors");
const { User } = require("../../schemas");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verifyToken: verificationToken });
  if (!user) {
    throw NotFound("Пользователь не найден");
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });
  res.json({
    status: "success",
    code: 200,
    message: "Email success verify",
  });
};

module.exports = verify;

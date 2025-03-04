const { User } = require("..//..//schemas");

const logout = async (req, res) => {
  const { _id } = req.params;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;

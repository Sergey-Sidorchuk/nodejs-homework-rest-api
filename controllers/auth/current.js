const { User } = require("..//..//schemas");

const current = async (req, res, next) => {
  try {
    const userToken = req.user.token;
    const user = await User.findUserByToken(userToken);

    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    return res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;

// const { User } = require('../../schemas')

// const current = async (req, res, _) => {
//   const [{ _id: id, email, subscription }] = await User.find(req.user)
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       id,
//       email,
//       subscription
//     }
//   })
// }

// module.exports = current

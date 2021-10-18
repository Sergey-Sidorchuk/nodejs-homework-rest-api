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

    // Status: 200 OK
    // Content-Type: application/json
    // ResponseBody: {
    //   "email": "example@example.com",
    //   "subscription": "starter"
    // }
  } catch (error) {
    next(error);
  }
};

module.exports = current;

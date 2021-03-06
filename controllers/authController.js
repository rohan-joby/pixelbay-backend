const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return next(new ErrorResponse("Duplicate email id", 422));
    }
    const newUser = await User.create({ firstName, lastName, email, password });
    sendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide valid credentials!", 400));
  }
  try {
    const user = await User.findOne({ email }, "email password firstName lastName");
    if (!user) {
      return next(new ErrorResponse("Please provide valid credentials!", 401));
    }
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials!", 401));
    }
    console.log("user",user)
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const timeLeft = Number(process.env.JWT_EXPIRE.slice(0, 3)) * 60 * 1000;
  const expireTime = new Date().getTime() + timeLeft;
  res
    .status(statusCode)
    .json({
      success: true,
      token: token,
      expiresAt: expireTime,
      firstName: user.firstName,
      lastName: user.lastName,
    });
};

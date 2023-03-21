const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicUrl",
    },
  });

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 400));
  }

  const user = User.findOne({ email});
  console.log(user);

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordmatched = user.comparePassword(password);
  console.log(isPasswordmatched);
  if (!isPasswordmatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});

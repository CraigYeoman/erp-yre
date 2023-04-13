const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/index").BadRequestError;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  console.log(BadRequestError);
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExits = await User.findOne({ email });
  if (userAlreadyExits) {
    throw new BadRequestError("Email already in use");
  }
  console.log(typeof req.body);
  const user = await User.create(name, email, password);
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { email: user.email, name: user.name, location: user.location },
    token,
  });
};

const login = async (req, res) => {
  res.send("login.user");
};

const updateUser = async (req, res) => {
  res.send("updateUser");
};

const getCurrentUser = async (req, res) => {
  res.send("getCurrentUser");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { register, login, updateUser, getCurrentUser, logout };

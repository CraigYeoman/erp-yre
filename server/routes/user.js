const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/auth");

// POST request for registering a User.
router.route("/register").post(register);
router.route("/login").post(login);
router.route("./update").patch(authenticateUser, updateUser);

module.exports = router;

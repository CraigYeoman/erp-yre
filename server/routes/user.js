const express = require("express");
const router = express.Router();

const { register, login, update } = require("../controllers/userController");

// POST request for registering a User.
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;

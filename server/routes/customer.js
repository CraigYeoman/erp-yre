const express = require("express");
const router = express.Router();

const { getAllCustomersStatic } = require("../controllers/customerController");

router.route("/static").get(getAllCustomersStatic);

module.exports = router;

const express = require("express");
const router = express.Router();

const { getAllVendorsStatic } = require("../controllers/vendorController");

router.route("/static").get(getAllVendorsStatic);

module.exports = router;

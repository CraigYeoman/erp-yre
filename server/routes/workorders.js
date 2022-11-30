const express = require("express");
const router = express.Router();

const { getAllVendorsStatic } = require("../controllers/vendorController");

router.route("/vendors/static").get(getAllVendorsStatic);

module.exports = router;

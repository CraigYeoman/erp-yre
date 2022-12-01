const express = require("express");
const router = express.Router();

const {
  getAllVendors,
  getAllVendorsStatic,
} = require("../controllers/vendorController");

router.route("/").get(getAllVendors);
router.route("/static").get(getAllVendorsStatic);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllCustomersStatic,
  getAllCustomers,
} = require("../controllers/customerController");

router.route("/").get(getAllCustomers);
router.route("/static").get(getAllCustomersStatic);

module.exports = router;

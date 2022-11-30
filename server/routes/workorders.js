const express = require("express");
const router = express.Router();

const {
  getAllWorkOrdersStatic,
} = require("../controllers/workOrderController");

router.route("/static").get(getAllWorkOrdersStatic);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllWorkOrders,
  getAllWorkOrdersStatic,
} = require("../controllers/workOrderController");

router.route("/").get(getAllWorkOrders);
router.route("/static").get(getAllWorkOrdersStatic);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllWorkOrders,
  getAllWorkOrdersStatic,
  work_order_create_post,
} = require("../controllers/workOrderController");

router.route("/").get(getAllWorkOrders);
router.route("/static").get(getAllWorkOrdersStatic);
// GET request for creating a work order.
router.route("/create").get(work_order_create_post);

module.exports = router;

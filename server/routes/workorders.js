const express = require("express");
const router = express.Router();

const {
  getAllWorkOrders,
  getAllWorkOrdersStatic,
  work_order_create_get,
  work_order_create_post,
  work_order_detail,
  work_order_delete_get,
  work_order_delete_post,
  index,
} = require("../controllers/workOrderController");

router.route("/index").get(index);
// GET request for creating a work order.
router.route("/create").get(work_order_create_get);
// POST request for creating a work order.
router.route("/create").post(work_order_create_post);
// GET request to delete work order.
router.route("/:id/delete").get(work_order_delete_get);
// POST request to delete work order.
router.route("/:id/delete").post(work_order_delete_post);
// GET request to update work order.
// POST request to update work order.

// GET request for one work order.
router.route("/:id").get(work_order_detail);
// GET request for list of all work order
router.route("/").get(getAllWorkOrders);
router.route("/static").get(getAllWorkOrdersStatic);

module.exports = router;

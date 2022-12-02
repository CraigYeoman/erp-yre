const express = require("express");
const router = express.Router();

const {
  customer_create_get,
  customer_create_post,
  getAllCustomersStatic,
  getAllCustomers,
  customer_detail,
} = require("../controllers/customerController");

// GET request for creating a Customer.
router.route("/create").get(customer_create_get);
// POST request for creating Book.
router.route("/create").post(customer_create_post);

// GET request to delete Book.
// POST request to delete Book.
// GET request to update Book.
// POST request to update Book.

// GET request for one Book.
router.route("/:id").get(customer_detail);
// GET request for list of all Book items.
router.route("/").get(getAllCustomers);
router.route("/static").get(getAllCustomersStatic);

module.exports = router;

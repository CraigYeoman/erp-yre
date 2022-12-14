const express = require("express");
const router = express.Router();

const {
  getAllVendors,
  getAllVendorsStatic,
  vendor_detail,
  vendor_create_post,
} = require("../controllers/vendorController");

// GET request for creating a Vendor.

// POST request for creating Vendor.
router.route("/create").post(vendor_create_post);
// GET request to delete Vendor.
// POST request to delete Vendor.
// GET request to update Vendor.
// POST request to update Vendor.

// GET request for one Vendor.
router.route("/:id").get(vendor_detail);
// GET request for list of all Vendor items.
router.route("/").get(getAllVendors);
router.route("/static").get(getAllVendorsStatic);

module.exports = router;

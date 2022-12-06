const express = require("express");
const router = express.Router();

const {
  getAllLabor,
  getAllLaborStatic,
  labor_detail,
} = require("../controllers/laborController");

// GET request for creating a Labor.

// POST request for creating Labor.

// GET request to delete Labor.
// POST request to delete Labor.
// GET request to update Labor.
// POST request to update Labor.

// GET request for one Labor.
router.route("/:id").get(labor_detail);
// GET request for list of all Labor items.
router.route("/").get(getAllLabor);
router.route("/static").get(getAllLaborStatic);

module.exports = router;

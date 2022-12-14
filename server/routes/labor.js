const express = require("express");
const router = express.Router();

const {
  getAllLabor,
  getAllLaborStatic,
  labor_detail,
  labor_create_post,
  labor_delete_get,
  labor_delete_post,
} = require("../controllers/laborController");

// GET request for creating a Labor - not needed

// POST request for creating Labor.
router.route("/create").post(labor_create_post);
// GET request to delete Labor.
router.route("/:id/delete").get(labor_delete_get);
// POST request to delete Labor.
router.route("/:id/delete").post(labor_delete_post);
// GET request to update Labor.
// POST request to update Labor.

// GET request for one Labor.
router.route("/:id").get(labor_detail);
// GET request for list of all Labor items.
router.route("/").get(getAllLabor);
router.route("/static").get(getAllLaborStatic);

module.exports = router;

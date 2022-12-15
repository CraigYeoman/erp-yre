const express = require("express");
const router = express.Router();

const {
  getAllParts,
  getAllPartsStatic,
  part_detail,
  parts_create_get,
  parts_create_post,
} = require("../controllers/partsController");

// GET request for creating a Part.
router.route("/create").get(parts_create_get);
// POST request for creating Part.
router.route("/create").post(parts_create_post);
// GET request to delete Part.
// POST request to delete Part.
// GET request to update Part.
// POST request to update Part.

// GET request for one Part.
router.route("/:id").get(part_detail);
// GET request for list of all Part items.
router.route("/").get(getAllParts);
router.route("/static").get(getAllPartsStatic);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllParts,
  getAllPartsStatic,
} = require("../controllers/partsController");

router.route("/").get(getAllParts);
router.route("/static").get(getAllPartsStatic);

module.exports = router;

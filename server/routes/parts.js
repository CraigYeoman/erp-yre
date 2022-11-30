const express = require("express");
const router = express.Router();

const { getAllPartsStatic } = require("../controllers/partsController");

router.route("/static").get(getAllPartsStatic);

module.exports = router;

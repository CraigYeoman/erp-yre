const express = require("express");
const router = express.Router();

const {
  getAllLabor,
  getAllLaborStatic,
} = require("../controllers/laborController");

router.route("/").get(getAllLabor);
router.route("/static").get(getAllLaborStatic);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllJobTypesStatic,
  getAllJobTypes,
} = require("../controllers/jobTypeController");

router.route("/").get(getAllJobTypes);
router.route("/static").get(getAllJobTypesStatic);

module.exports = router;

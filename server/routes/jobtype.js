const express = require("express");
const router = express.Router();

const { getAllJobTypesStatic } = require("../controllers/jobTypeController");

router.route("/static").get(getAllJobTypesStatic);

module.exports = router;

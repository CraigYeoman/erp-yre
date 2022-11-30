const express = require("express");
const router = express.Router();

const { getAllLaborStatic } = require("../controllers/laborController");

router.route("/static").get(getAllLaborStatic);

module.exports = router;

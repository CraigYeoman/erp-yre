const { body, validationResult } = require("express-validator");
const Labor = require("../models/labor");
const async = require("async");

// Display list of all labor.
const getAllLaborStatic = async (req, res) => {
  const labors = await Labor.find().sort("name");
  res.status(200).json({ labors, nbHits: labors.length });
};

module.exports = {
  getAllLaborStatic,
};

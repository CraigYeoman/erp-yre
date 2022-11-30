const { body, validationResult } = require("express-validator");
const Parts = require("../models/parts");
const async = require("async");

// Display list of all parts.
const getAllPartsStatic = async (req, res) => {
  const parts = await Parts.find().sort("vendor");
  res.status(200).json({ parts, nbHits: parts.length });
};

module.exports = {
  getAllPartsStatic,
};

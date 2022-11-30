const { body, validationResult } = require("express-validator");
const JobType = require("../models/jobType");
const async = require("async");

// Display list of all Vendors.
const getAllJobTypesStatic = async (req, res) => {
  const jobtypes = await JobType.find().sort("type");
  res.status(200).json({ jobtypes, nbHits: jobtypes.length });
};

module.exports = {
  getAllJobTypesStatic,
};

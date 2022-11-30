const { body, validationResult } = require("express-validator");
const JobType = require("../models/jobType");
const async = require("async");

// Display list of all job types.
const getAllJobTypesStatic = async (req, res) => {
  const jobtypes = await JobType.find().sort("type");
  res.status(200).json({ jobtypes, nbHits: jobtypes.length });
};

const getAllJobTypes = async (req, res) => {
  const { name, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.last_name = { $regex: last_name, $options: "i" };
  }
  if (first_name) {
    queryObject.first_name = { $regex: first_name, $options: "i" };
  }

  let result = JobType.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("first_name");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobTypes = await result;
  res.status(200).json({ jobTypes, nbHits: jobTypes.length });
};

module.exports = {
  getAllJobTypesStatic,
  getAllJobTypes,
};

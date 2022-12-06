const { body, validationResult } = require("express-validator");
const Labor = require("../models/labor");
const async = require("async");

// Display list of all labor.
const getAllLaborStatic = async (req, res) => {
  const labors = await Labor.find().sort("name");
  res.status(200).json({ labors, nbHits: labors.length });
};

const getAllLabor = async (req, res) => {
  const { name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = "price";
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Labor.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const labor = await result;
  res.status(200).json({ labor, nbHits: labor.length });
};

// Display labor page for a specific Labor.
const labor_detail = (req, res, next) => {
  Labor.findById(req.params.id).exec(function (err, results) {
    if (err) {
      // Error in API usage.
      return next(err);
    }
    if (results == null) {
      // No results.
      const err = new Error("Labor not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.status(200).json({
      labor_detail: results,
    });
  });
};

module.exports = {
  getAllLaborStatic,
  getAllLabor,
  labor_detail,
};

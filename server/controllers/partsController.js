const { body, validationResult } = require("express-validator");
const Parts = require("../models/parts");
const Vendor = require("../models/vendor");
const async = require("async");

// Display list of all parts.
const getAllPartsStatic = async (req, res) => {
  const parts = await Parts.find().sort("vendor");
  res.status(200).json({ parts, nbHits: parts.length });
};

const getAllParts = async (req, res) => {
  const {
    name,
    part_number,
    vendor,
    manufacture,
    sort,
    fields,
    numericFilters,
  } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (part_number) {
    queryObject.part_number = { $regex: part_number, $options: "i" };
  }
  if (vendor) {
    queryObject.vendor = { $regex: vendor, $options: "i" };
  }
  if (manufacture) {
    queryObject.manufacture = { $regex: manufacture, $options: "i" };
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
    const options = ["customer_price", "cost"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Parts.find(queryObject).populate("vendor");
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("manufacture");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const parts = await result;
  res.status(200).json({ parts, nbHits: parts.length });
};

// Display part page for a specific Part.
const part_detail = (req, res, next) => {
  Parts.findById(req.params.id)
    .populate("vendor")
    .exec(function (err, results) {
      if (err) {
        // Error in API usage.
        return next(err);
      }
      if (results == null) {
        // No results.
        const err = new Error("Part not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.

      res.status(200).json({
        part: results,
      });
    });
};

module.exports = {
  getAllPartsStatic,
  getAllParts,
  part_detail,
};

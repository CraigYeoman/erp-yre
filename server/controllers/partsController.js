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

// Display parts create form on GET

const parts_create_get = (req, res, next) => {
  Vendor.find({}, "name").exec((err, vendors) => {
    if (err) {
      return next(err);
    }
    // Successful
    res.status(200).json({
      vendor_list: vendors,
    });
  });
};

const parts_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Part name must be specified."),
  body("customer_price", "Customer price required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("cost", "Cost price required").trim().isLength({ min: 1 }).escape(),
  body("part_number")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Part number must be specified."),
  body("vendor").trim().isLength({ min: 1 }).escape(),
  body("manufacture")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Manufacture must be specified."),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a part object with escaped and trimmed data.

    const part = new Parts({
      name: req.body.name,
      customer_price: req.body.customer_price,
      cost: req.body.cost,
      part_number: req.body.part_number,
      vendor: req.body.vendor,
      manufacture: req.body.manufacture,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        part: req.body,
        errors: errors.array(),
      });

      return;
    }

    part.save((err) => {
      if (err) {
        return next(err);
      }
      // Part saved.
      res.status(200).json({
        msg: "Part created",
        part: part,
      });
    });
  },
];

module.exports = {
  getAllPartsStatic,
  getAllParts,
  part_detail,
  parts_create_get,
  parts_create_post,
};

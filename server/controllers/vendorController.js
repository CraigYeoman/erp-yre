const { body, validationResult } = require("express-validator");
const Vendor = require("../models/vendor");
const async = require("async");

// Display list of all Vendors.
const getAllVendorsStatic = async (req, res) => {
  const vendors = await Vendor.find().sort("name").select("name main_contact");
  res.status(200).json({ vendors, nbHits: vendors.length });
};

const getAllVendors = async (req, res) => {
  const { name, main_contact, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (main_contact) {
    queryObject.main_contact = { $regex: main_contact, $options: "i" };
  }

  let result = Vendor.find(queryObject);
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

  const vendors = await result;
  res.status(200).json({ vendors, nbHits: vendors.length });
};

module.exports = {
  getAllVendorsStatic,
  getAllVendors,
};

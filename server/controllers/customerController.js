const { body, validationResult } = require("express-validator");
const Customer = require("../models/customer");
const async = require("async");

// Display list of all customers.
const getAllCustomersStatic = async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.status(200).json({ customers, nbHits: customers.length });
};

const getAllCustomers = async (req, res) => {
  const { last_name, first_name, sort, fields } = req.query;
  const queryObject = {};
  if (last_name) {
    queryObject.last_name = { $regex: last_name, $options: "i" };
  }
  if (first_name) {
    queryObject.first_name = { $regex: first_name, $options: "i" };
  }

  let result = Customer.find(queryObject);
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

  const customers = await result;
  res.status(200).json({ customers, nbHits: customers.length });
};

module.exports = {
  getAllCustomersStatic,
  getAllCustomers,
};

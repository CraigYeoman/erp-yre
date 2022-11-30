const { body, validationResult } = require("express-validator");
const Customer = require("../models/customer");
const async = require("async");

// Display list of all Vendors.
const getAllCustomersStatic = async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.status(200).json({ customers, nbHits: customers.length });
};

module.exports = {
  getAllCustomersStatic,
};

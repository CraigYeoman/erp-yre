const { body, validationResult } = require("express-validator");
const Vendor = require("../models/vendor");
const async = require("async");

// Display list of all Vendors.
const getAllVendorsStatic = async (req, res) => {
  const vendors = await Vendor.find().sort("name").select("name main_contact");
  res.status(200).json({ vendors, nbHits: vendors.length });
};

module.exports = {
  getAllVendorsStatic,
};

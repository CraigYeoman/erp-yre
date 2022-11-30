const { body, validationResult } = require("express-validator");
const Vendor = require("../models/vendor");
const async = require("async");

// Display list of all Vendors.
exports.vendor_list = function (req, res, next) {
  Vendor.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_vendors) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.status(200).json(list_vendors);
    });
};

const getAllVendorsStatic = async (req, res) => {
  const vendors = await Vendor.find().sort("name").select("name main_contact");
  res.status(200).json({ vendors, nbHits: vendors.length });
};

module.exports = {
  getAllVendorsStatic,
};

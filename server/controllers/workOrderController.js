const { body, validationResult } = require("express-validator");
const WorkOrder = require("../models/workOrder");
const Customer = require("../models/customer");
const JobType = require("../models/jobType");
const Parts = require("../models/parts");
const Labor = require("../models/labor");
const async = require("async");

// Display list of all Vendors.
const getAllWorkOrdersStatic = async (req, res) => {
  const workOrders = await WorkOrder.find().sort("customer");
  res.status(200).json({ workOrders, nbHits: workOrders.length });
};

const getAllWorkOrders = async (req, res) => {
  const { customer, complete, jobType, sort, fields, numericFilters } =
    req.query;
  const queryObject = {};
  if (customer) {
    queryObject.customer.last_name = {
      $regex: customer.last_name,
      $options: "i",
    };
  }
  if (complete) {
    queryObject.complete = complete === "true" ? true : false;
  }
  if (jobType) {
    queryObject.jobType = { $regex: jobType, $options: "i" };
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
    const options = [
      "date_received",
      "date_due",
      "estimatedPrice",
      "work_order_number",
    ];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = WorkOrder.find(queryObject)
    .populate("customer")
    .populate("jobType")
    .populate("parts")
    .populate("labor");
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("date_due");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const workOrders = await result;
  res.status(200).json({ workOrders, nbHits: workOrders.length });
};

module.exports = {
  getAllWorkOrdersStatic,
  getAllWorkOrders,
};

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

// Display detail page for a specific Work Order.
const work_order_detail = (req, res, next) => {
  async.parallel(
    {
      work_order(callback) {
        WorkOrder.findById(req.params.id)
          .populate("customer")
          .populate("jobType")
          .populate("parts")
          .populate("labor")
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        // Error in API usage.
        return next(err);
      }
      if (results.work_order == null) {
        // No results.
        const err = new Error("Work Order not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.

      res.status(200).json({
        work_order: results.work_order,
      });
    }
  );
};

// Display workorder create form on GET
const work_order_create_post = (req, res, next) => {
  async.parallel(
    {
      customer(callback) {
        Customer.find(callback);
      },
      jobType(callback) {
        JobType.find(callback);
      },
      parts(callback) {
        Parts.find(callback);
      },
      labor(callback) {
        Labor.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        customers: results.customer,
        jobtypes: results.jobType,
        parts: results.parts,
        labors: results.labor,
      });
    }
  );
};

module.exports = {
  getAllWorkOrdersStatic,
  getAllWorkOrders,
  work_order_create_post,
  work_order_detail,
};

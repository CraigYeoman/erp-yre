const { body, validationResult } = require("express-validator");
const WorkOrder = require("../models/workOrder");
const Customer = require("../models/customer");
const JobType = require("../models/jobType");
const Parts = require("../models/parts");
const Labor = require("../models/labor");
const Accessories = require("../models/accessories");
const PartsCategory = require("../models/partCategory");
const LaborCategory = require("../models/laborCategory");
const async = require("async");
const endOfWeek = require("date-fns/endOfWeek");
const startOfWeek = require("date-fns/startOfWeek");

// Display list of all Work orders.
const getAllWorkOrdersStatic = async (req, res) => {
  const workOrders = await WorkOrder.find().sort("customer");
  res.status(200).json({ workOrders, nbHits: workOrders.length });
};

const indexOld = (req, res, next) => {
  async.parallel(
    {
      work_order_count(callback) {
        WorkOrder.countDocuments({}, callback);
      },
      work_order_count_new(callback) {
        WorkOrder.countDocuments({ JobType: "new" }, callback);
      },
      work_order_count_refreshen(callback) {
        WorkOrder.countDocuments({ JobType: "refreshen" }, callback);
      },
      work_order_count_repair(callback) {
        WorkOrder.countDocuments({ JobType: "repair" }, callback);
      },
      work_order_count_machine_work(callback) {
        WorkOrder.countDocuments({ JobType: "machine work" }, callback);
      },
      work_order_count_in_out(callback) {
        WorkOrder.countDocuments({ JobType: "in out" }, callback);
      },
      work_order_count_walk_in(callback) {
        WorkOrder.countDocuments({ JobType: "walk in" }, callback);
      },
      work_order_count_used(callback) {
        WorkOrder.countDocuments({ JobType: "used" }, callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results == null) {
        const err = new Error("Not found");
        err.status = 404;
        return next(err);
      }
      res.status(200).json({
        results,
      });
    }
  );
};

const index = async (req, res, next) => {
  const collection = await JobType.find();
  const countArray = [];

  for (const job of collection) {
    let count = await WorkOrder.countDocuments({
      jobType: job._id,
    });
    countArray.push({ name: job.name, count: count });
  }

  currentDate = new Date();
  let currentWeekStart = startOfWeek(currentDate);
  let currentWeekEnd = endOfWeek(currentDate);
  let nextWeekStart = new Date(currentWeekStart);
  let nextWeekEnd = new Date(currentWeekEnd);
  let thirdWeekStart = new Date(currentWeekStart);
  let fourthWeekEnd = new Date(currentWeekEnd);
  currentWeekStart.toISOString();
  currentWeekEnd.toISOString();
  nextWeekStart.setDate(nextWeekStart.getDate() + 7);
  nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
  thirdWeekStart.setDate(nextWeekStart.getDate() + 14);
  fourthWeekEnd.setDate(nextWeekEnd.getDate() + 28);

  const past_due = await WorkOrder.find({
    date_due: { $lte: currentDate },
  })
    .populate("customer")
    .populate("jobType");

  const due_this_week = await WorkOrder.find({
    $and: [
      { date_due: { $gte: currentWeekStart } },
      { date_due: { $lte: currentWeekEnd } },
    ],
  })
    .populate("customer")
    .populate("jobType");

  const due_next_week = await WorkOrder.find({
    $and: [
      { date_due: { $gte: nextWeekStart } },
      { date_due: { $lte: nextWeekEnd } },
    ],
  })
    .populate("customer")
    .populate("jobType");

  const due_week_three_four = await WorkOrder.find({
    $and: [
      { date_due: { $gte: thirdWeekStart } },
      { date_due: { $lte: fourthWeekEnd } },
    ],
  })
    .populate("customer")
    .populate("jobType");

  res.status(200).json({
    countArray,
    past_due,
    due_this_week,
    due_next_week,
    due_week_three_four,
  });
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
    const options = ["date_received", "date_due", "work_order_number"];
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
    .populate("labor")
    .populate("accessories");
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
          .populate("accessories")
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
const work_order_create_get = (req, res, next) => {
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
      accessories(callback) {
        Accessories.find(callback);
      },
      partsCategory(callback) {
        PartsCategory.find(callback);
      },
      laborCategory(callback) {
        LaborCategory.find(callback);
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
        accessories: results.accessories,
        partsCategory: results.partsCategory,
        laborCategory: results.laborCategory,
      });
    }
  );
};

const work_order_create_post = [
  // Validate and sanitize fields.

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a part object with escaped and trimmed data.

    const workOrder = new WorkOrder({
      customer: req.body.customer,
      date_received: req.body.date_received,
      date_due: req.body.date_due,
      date_finished: req.body.date_finished,
      complete: req.body.complete,
      jobType: req.body.jobtype,
      accessories: req.body.accessories,
      parts: req.body.parts,
      labor: req.body.labor,
      notes: req.body.notes,
      work_order_number: req.body.work_order_number,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        workOrder: req.body,
        errors: errors.array(),
      });

      return;
    }

    workOrder.save((err) => {
      if (err) {
        return next(err);
      }
      // workOrder saved.
      res.status(200).json({
        msg: "Work order created",
        workOrder: workOrder,
      });
    });
  },
];

// Handle Work Order delete on GET.
const work_order_delete_get = async (req, res) => {
  const work_order = await WorkOrder.findById(req.params.id);
  res.status(200).json({ work_order });
};

// Handle Work Order delete on POST.
const work_order_delete_post = (req, res, next) => {
  WorkOrder.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success
    res.status(200).json({
      msg: "Complete",
    });
  });
};

// Edit work order get.
const work_order_edit_get = (req, res, next) => {
  async.parallel(
    {
      work_order(callback) {
        WorkOrder.findById(req.params.id)
          .populate("customer")
          .populate("jobType")
          .populate("parts")
          .populate("labor")
          .populate("accessories")
          .exec(callback);
      },
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
      accessories(callback) {
        Accessories.find(callback);
      },
      partsCategory(callback) {
        PartsCategory.find(callback);
      },
      laborCategory(callback) {
        LaborCategory.find(callback);
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
        customers: results.customer,
        jobtypes: results.jobType,
        parts: results.parts,
        labors: results.labor,
        accessories: results.accessories,
        partsCategory: results.partsCategory,
        laborCategory: results.laborCategory,
      });
    }
  );
};

const work_order_edit_post = [
  // Validate and sanitize fields.

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a part object with escaped and trimmed data.

    const workOrder = new WorkOrder({
      customer: req.body.customer,
      date_received: req.body.date_received,
      date_due: req.body.date_due,
      date_finished: req.body.date_finished,
      complete: req.body.complete,
      jobType: req.body.jobtype,
      accessories: req.body.accessories,
      parts: req.body.parts,
      labor: req.body.labor,
      notes: req.body.notes,
      work_order_number: req.body.work_order_number,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        workOrder: req.body,
        errors: errors.array(),
      });

      return;
    }

    WorkOrder.findByIdAndUpdate(
      req.params.id,
      workOrder,
      {},
      (err, updatedWorkOrder) => {
        if (err) {
          return next(err);
        }
        // workOrder updated.
        res.status(200).json({
          msg: "Work order edited",
          workOrder: workOrder,
          updatedWorkOrder: updatedWorkOrder,
        });
      }
    );
  },
];

module.exports = {
  getAllWorkOrdersStatic,
  getAllWorkOrders,
  work_order_create_get,
  work_order_create_post,
  work_order_detail,
  work_order_delete_get,
  work_order_delete_post,
  work_order_edit_get,
  work_order_edit_post,
  index,
};

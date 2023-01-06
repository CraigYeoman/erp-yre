const { body, validationResult } = require("express-validator");
const JobType = require("../models/jobType");
const WorkOrder = require("../models/workOrder");
const async = require("async");

// Display list of all job types.
const getAllJobTypesStatic = async (req, res) => {
  const jobtypes = await JobType.find().sort("type");
  res.status(200).json({ jobtypes, nbHits: jobtypes.length });
};

const getAllJobTypes = async (req, res) => {
  const { name, sort, fields } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = JobType.find(queryObject);
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

  const jobTypes = await result;
  res.status(200).json({ jobTypes, nbHits: jobTypes.length });
};

const job_type_detail = (req, res, next) => {
  JobType.findById(req.params.id).exec(function (err, results) {
    if (err) {
      // Error in API usage.
      return next(err);
    }
    if (results == null) {
      // No results.
      const err = new Error("Job type not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.status(200).json({
      job_type_detail: results,
    });
  });
};

const jobtype_create_post = [
  // Validate and sanitize fields.
  body("name", "Job Type name required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(500).json({
        jobtype: req.body,
        errors: errors.array(),
      });

      return;
    }
    // Create a jobtype object with escaped and trimmed data.
    const jobtype = new JobType({
      name: req.body.name,
    });

    jobtype.save((err) => {
      if (err) {
        return next(err);
      }
      // jobtype saved.
      res.status(200).json({
        msg: "job type created",
        jobtype: jobtype,
      });
    });
  },
];

// Handle Job Type delete on GET.
const job_type_delete_get = (req, res, next) => {
  async.parallel(
    {
      jobType(callback) {
        JobType.findById(req.params.id).exec(callback);
      },
      job_type_work_orders(callback) {
        WorkOrder.find({ jobType: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.job_type_work_orders.length > 0) {
        // Job Type has work orders. Render in same way as for GET route.
        res.status(200).json({
          jobType: results.jobType,
          job_type_work_orders: results.job_type_work_orders,
        });
        return;
      } else {
        res.status(200).json({
          msg: "Are you sure you want to delete?",
        });
      }
    }
  );
};

// Handle Job Type delete on POST.
const job_type_delete_post = (req, res, next) => {
  // Job Type has no work orders. Delete object and redirect to the list of Job Types.
  JobType.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success - go to author list
    res.status(200).json({
      msg: "Complete",
    });
  });
};

module.exports = {
  getAllJobTypesStatic,
  getAllJobTypes,
  job_type_detail,
  jobtype_create_post,
  job_type_delete_get,
  job_type_delete_post,
};

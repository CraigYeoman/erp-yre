const { body, validationResult } = require("express-validator");
const Customer = require("../models/customer");
const WorkOrder = require("../models/workOrder");
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

// Display detail page for a specific Customer.
const customer_detail = (req, res, next) => {
  async.parallel(
    {
      customer(callback) {
        Customer.findById(req.params.id).exec(callback);
      },
      customer_workorders(callback) {
        WorkOrder.find({ customer: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        // Error in API usage.
        return next(err);
      }
      if (results.customer == null) {
        // No results.
        const err = new Error("Customer not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      console.log(results.customer.url);
      res.status(200).json({
        customer: results.customer,
        customer_workorders: results.customer_workorders,
      });
    }
  );
};

// Display customer create form on GET
const customer_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Customer create GET");
};

// Handle customer create form on POST
const customer_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),
  body("phone_number", "Invalid phone number").isLength({ min: 10 }),
  body("email", "Invalid email").isEmail(),
  body("address_line_1", "Invalid address").isLength({ min: 1 }).trim(),
  body("address_line_2", "Invalid address").isLength({ min: 1 }).trim(),
  body("city", "Invalid city").isLength({ min: 1 }).trim(),
  body("state", "Invalid state initials").isLength({ min: 2 }).isPostalCode(),
  body("zipe_code", "Invalid zipcode").isLength({ min: 5 }),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json("customer_form", {
        errors: errors.array(),
      });
      return;
    }
    // Data from form is valid.

    // Create a Customer object with escaped and trimmed data.
    const customer = new Customer({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
    });
    customer.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful - redirect to new customer record.
      res.redirect(customer.url);
    });
  },
];

module.exports = {
  getAllCustomersStatic,
  getAllCustomers,
  customer_detail,
  customer_create_get,
  customer_create_post,
};

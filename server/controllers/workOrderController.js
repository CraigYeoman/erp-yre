const { body, validationResult } = require("express-validator");
const WorkOrder = require("../models/workOrder");
const async = require("async");

// Display list of all Vendors.
const getAllWorkOrdersStatic = async (req, res) => {
  const workOrders = await WorkOrder.find().sort("customer");
  res.status(200).json({ workOrders, nbHits: workOrders.length });
};

module.exports = {
  getAllWorkOrdersStatic,
};

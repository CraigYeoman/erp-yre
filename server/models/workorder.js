const mongoose = require("mongoose");

const workOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "customer name must be provided"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "customer phone number must be provided"],
  },
  address: {
    type: String,
    required: [true, "customer address must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    required: [true, "due date must be provided"],
  },
  estimatedPrice: {
    type: Number,
    required: [true, "workorder price must be provided"],
  },
  complete: {
    type: Boolean,
    default: false,
  },
  jobType: {
    type: String,
    enum: {
      values: [
        "Refreshen Race Motor",
        "New Race Motor",
        "Machine Work",
        "In-Out",
        "Walk-In",
      ],
      message: "{VALUE} is not supported",
    },
  },
  accessories: {
    type: String,
    enum: {
      values: [
        "None",
        "water pump",
        "pulleys",
        "distributor",
        "distributor wires",
        "power steering pump",
        "engine stand",
      ],
      message: "{VALUE} is not supported",
    },
    required: [true, "accessories must be provided"],
  },
});

module.exports = mongoose.model("WorkOrder", workOrderSchema);

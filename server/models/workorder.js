const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workOrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer name must be provided"],
  },
  dateReceived: {
    type: Date,
    default: Date.now(),
  },
  dateDue: {
    type: Date,
    required: [true, "Due date must be provided"],
  },
  estimatedPrice: {
    type: Number,
    required: [true, "Workorder price must be provided"],
  },
  complete: {
    type: Boolean,
    default: false,
  },
  jobType: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Job type must be provided"],
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
        "flywheel",
        "spud",
      ],
      message: "{VALUE} is not supported",
    },
    required: [true, "accessories must be provided"],
  },
  parts: {
    type: Schema.Types.ObjectId,
    ref: "Parts",
  },
  labor: {
    type: Schema.Types.ObjectId,
    ref: "Labor",
  },
  notes: {
    type: String,
    required: [true, "Workorder description must be provided"],
  },
});

workOrderSchema.virtual("url").get(function () {
  return `/erp/workorder/${this._id}`;
});

module.exports = mongoose.model("WorkOrder", workOrderSchema);

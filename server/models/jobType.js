const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobTypeSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for this genre instance URL.
JobTypeSchema.virtual("url").get(function () {
  return "/erp/jobtype/" + this._id;
});

module.exports = mongoose.model("JobType", JobTypeSchema);

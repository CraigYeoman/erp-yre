const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LaborSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  price: { type: Number, required: true },
});

// Virtual for this genre instance URL.
LaborSchema.virtual("url").get(function () {
  return "/erp/labor/" + this._id;
});

module.exports = mongoose.model("Labor", LaborSchema);

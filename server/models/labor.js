const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LaborSchema = new Schema({
  name: {
    type: String,
    required: [true, "Labor name must be provied."],
    minLength: [3, "Labor must have a minimum of 3 characters."],
    maxLength: 100,
  },
  price: { type: Number, required: [true, "Labor price must be provided"] },
});

LaborSchema.virtual("url").get(function () {
  return "/erp/labor/" + this._id;
});

module.exports = mongoose.model("Labor", LaborSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartsSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  customer_price: { type: Number, required: true },
  cost: { type: Number, required: true },
  part_number: { type: String, required: true, minLength: 3, maxLength: 100 },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
  },
  manufacture: { type: String, required: true, minLength: 3, maxLength: 100 },
});

PartsSchema.virtual("url").get(function () {
  return "/erp/parts/" + this._id;
});

module.exports = mongoose.model("Parts", PartsSchema);

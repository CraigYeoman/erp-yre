const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartsSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  customer_price: {
    type: Number,
    required: [true, "Customer price must be provided"],
  },
  cost: { type: Number, required: [true, "Company cost must be provided"] },
  part_number: { type: String, required: true, minLength: 3, maxLength: 100 },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
  },
  category: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  manufacture: { type: String, required: true, minLength: 3, maxLength: 100 },
});

PartsSchema.virtual("url").get(function () {
  return "/erp/parts/" + this._id;
});

module.exports = mongoose.model("Parts", PartsSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  phone_number: { type: Number, required: true, maxLenght: 13 },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address",
  },
  address_line_1: { type: String, required: true, maxLength: 100 },
  address_line_2: { type: String, required: true, maxLength: 100 },
  city: { type: String, required: true, maxLength: 100 },
  state: { type: String, required: true, maxLength: 2 },
  zip_code: { type: String, required: true, maxLength: 5 },
});

CustomerSchema.virtual("url").get(function () {
  return `/erp/customer/${this._id}`;
});

module.exports = mongoose.model("Customer", CustomerSchema);

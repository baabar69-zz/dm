const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please add the company name "],
    trim: true,
    maxLength: [50, "Max length is 50"],
  },
  website: {
    type: String,
    match: [
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
      "please use a valid url",
    ],
  },
  phone: {
    type: String,
    maxLength: [10, "cant be more than 10"],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
  },
  uid: {
    type: String,
    unique: true,
  },
});
module.exports = mongoose.model("records", BootcampSchema);

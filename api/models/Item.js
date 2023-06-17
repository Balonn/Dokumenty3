const mongoose = require("mongoose");
const { StringSchema } = require("yup");

const itemSchema = new mongoose.Schema({
  nazwaFirmy: {
    type: String,
    trim: true,
    maxlength: [50, "Name cannot be more than 20 characters"],
  },
  nazwaPliku: {
    type: String,
    trim: true,
    maxlength: [50, "Name cannot be more than 20 characters"],
  },
  typPliku: {
    type: String,
    trim: true,
    maxlength: [50, "Name cannot be more than 20 characters"],
  },
  dataWrzucenia: {
    type: Date,
    default: Date.now,
  },
  dataWaznosci: {
    type: Date,
  },
  file: {
    type: String,
    required: [true, "Please provide a file"],
  },
});

module.exports = mongoose.model("Item", itemSchema);

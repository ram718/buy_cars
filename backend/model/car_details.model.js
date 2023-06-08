const mongoose = require("mongoose");

const carDetailsSchema = mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
  },
  { versionKey: false }
);

const CarDetailsModel = mongoose.model("carDetail", carDetailsSchema);

module.exports = { CarDetailsModel };

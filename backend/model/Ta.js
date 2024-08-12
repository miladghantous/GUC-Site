const mongoose = require("mongoose");

const TaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Ta = mongoose.model("Ta", TaSchema);
module.exports = Ta;

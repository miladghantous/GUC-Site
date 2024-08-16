const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },
    owner: {
      type: String,
    },
    reply: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);
module.exports = Complaint;

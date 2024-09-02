const mongoose = require("mongoose");

const FileLinkSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FileLink = mongoose.model("FileLink", FileLinkSchema);
module.exports = FileLink;

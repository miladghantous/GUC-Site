const mongoose = require("mongoose");

const FileLinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FileLink = mongoose.model("FileLink", FileLinkSchema);
module.exports = FileLink;

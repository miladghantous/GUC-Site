const mongoose = require("mongoose");

const QuestionAnswerSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ["Text", "Rating", "Multiple Choice", "Checkbox"],
    required: true,
  },
  options: {
    type: [String],
  },
});

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema);
module.exports = QuestionAnswer;

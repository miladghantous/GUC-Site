const mongoose = require("mongoose");

const QuestionAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    enum: [
      "Strongly Agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly Disagree",
    ],
    required: true,
  },
});

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema);
module.exports = QuestionAnswer;
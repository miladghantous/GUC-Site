const mongoose = require("mongoose");

const QuestionAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
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
  },
});

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema);
module.exports = QuestionAnswer;
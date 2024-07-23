const mongoose = require("mongoose");
const QuestionAnswerSchema = require("./QuestionAnswer");

const EvaluationFormSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [QuestionAnswerSchema],
  },
  { timestamps: true }
);
const EvaluationForm = mongoose.model("EvaluationForm", EvaluationFormSchema);
module.exports = EvaluationForm;

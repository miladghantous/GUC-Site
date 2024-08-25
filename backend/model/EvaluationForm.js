const mongoose = require("mongoose");
// const QuestionAnswerSchema = require("./QuestionAnswer").schema;

const EvaluationFormSchema = new mongoose.Schema(
  {
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evaluatedTA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ta",
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionAnswer",
      },
    ],
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuestionAnswer",
        },
        answer: mongoose.Schema.Types.Mixed, // For storing different types of answers
      },
    ],
  },
  { timestamps: true }
);
const EvaluationForm = mongoose.model("EvaluationForm", EvaluationFormSchema);
module.exports = EvaluationForm;

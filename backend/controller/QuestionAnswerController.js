const QuestionAnswerModel = require("../model/QuestionAnswer");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const EvaluationFormModel = require("../model/EvaluationForm");

//Add Questions
const addQuestionAnswer = asyncHandler(async (req, res) => {
  const questionAnswerBody = req.body;
  try {
    const questionAnswer = await QuestionAnswerModel.create(questionAnswerBody);
    res.status(200).json(questionAnswer);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//View All Questions
const viewAllQuestionAnswers = asyncHandler(async (req, res) => {
  try {
    const questionAnswer = await QuestionAnswerModel.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(questionAnswer);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//Exports
module.exports = {
  addQuestionAnswer,
  viewAllQuestionAnswers,
};

const EvaluationFormModel = require("../model/EvaluationForm");
const QuestionAnswerModel = require("../model/QuestionAnswer");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add Evaluation Form
const addEvaluationForm = asyncHandler(async (req, res) => {
  const evaluationformbody = req.body;
  try {
    const evaluationform = await EvaluationFormModel.create(evaluationformbody);
    res.status(200).json(evaluationform);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//Add Question Answer to Evaluation Form
const addQuestionAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const questionAnswerBody = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Evaluation Form not found");
  }
  try {
    const evaluationForm = await EvaluationFormModel.findById(id);
    const questionAnswer = await QuestionAnswerModel.create(questionAnswerBody);
    evaluationForm.questions.push(questionAnswer);
    await evaluationForm.save();
    res.status(200).json(evaluationForm);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Get All Question Answers
const viewAllQuestionAnswers = asyncHandler(async (req, res) => {
  try {
    const questionAnswers = await QuestionAnswerModel.find().sort({
      createdAt: -1,
    });
    res.status(200).json(questionAnswers);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Get a question answer by ID
const viewQuestionAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Question Answer not found");
  }

  try {
    const questionAnswer = await QuestionAnswerModel.findById(id);
    res.status(200).json(questionAnswer);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//update an answer in a question answer by ID
const updateQuestionAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const questionAnswerBody = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Question Answer not found");
  }

  try {
    const questionAnswer = await QuestionAnswerModel.findByIdAndUpdate(
      id,
      questionAnswerBody,
      { new: true }
    );
    // Find the Evaluation Form containing the QuestionAnswer
    const evaluationForm = await EvaluationFormModel.findOne({
      "questions._id": id,
    });

    if (!evaluationForm) {
      res.status(404);
      throw new Error("Evaluation Form not found");
    }

    // Update the specific question answer in the Evaluation Form
    const questionIndex = evaluationForm.questions.findIndex((q) =>
      q._id.equals(id)
    );
    if (questionIndex !== -1) {
      evaluationForm.questions[questionIndex] = questionAnswer;
      await evaluationForm.save();
    }

    res.status(200).json(questionAnswer);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// delete question answer by ID
const removeQuestionAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Question Answer not found");
  }

  try {
    const questionAnswer = await QuestionAnswerModel.findByIdAndDelete(id);
    // Find the Evaluation Form containing the QuestionAnswer
    const evaluationForm = await EvaluationFormModel.findOne({
      "questions._id": id,
    });

    if (!evaluationForm) {
      res.status(404);
      throw new Error("Evaluation Form not found");
    }

    // Remove the specific question answer in the Evaluation Form
    const questionIndex = evaluationForm.questions.findIndex((q) =>
      q._id.equals(id)
    );
    if (questionIndex !== -1) {
      evaluationForm.questions.splice(questionIndex, 1);
    }

    await evaluationForm.save();

    res.status(200).json(questionAnswer);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update question answer by ID

// Get All Evaluation Forms
const viewAllEvaluationForms = asyncHandler(async (req, res) => {
  try {
    const evaluationForms = await EvaluationFormModel.find().sort({
      createdAt: -1,
    });
    res.status(200).json(evaluationForms);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Get an evaluation form by ID
const viewEvaluationForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Evaluation Form not found");
  }

  try {
    const evaluationForm = await EvaluationFormModel.findById(id);
    res.status(200).json(evaluationForm);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Update evaluation form title or instructor by ID
const updateEvaluationForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const evaluationformbody = req.body;

  if (evaluationformbody.questions) {
    res.status(400);
    throw new Error("Not allowed to update questions");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Evaluation Form not found");
  }

  try {
    const evaluationForm = await EvaluationFormModel.findByIdAndUpdate(
      id,
      evaluationformbody,
      { new: true }
    );
    res.status(200).json(evaluationForm);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Delete evaluation form by ID
const removeEvaluationForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    throw new Error("Evaluation Form not found");
  }

  try {
    for (const question of (await EvaluationFormModel.findById(id)).questions) {
      await QuestionAnswerModel.findByIdAndDelete(question._id);
    }
    const evaluationForm = await EvaluationFormModel.findByIdAndDelete(id);

    res.status(200).json(evaluationForm);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  addEvaluationForm,
  viewAllEvaluationForms,
  viewEvaluationForm,
  updateEvaluationForm,
  removeEvaluationForm,
  addQuestionAnswer,
  viewAllQuestionAnswers,
  viewQuestionAnswer,
  updateQuestionAnswer,
  removeQuestionAnswer,
};

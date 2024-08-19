const EvaluationFormModel = require("../model/EvaluationForm");
const QuestionAnswerModel = require("../model/QuestionAnswer");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Add Evaluation Form
const addEvaluationForm = asyncHandler(async (req, res) => {
  const evaluationformbody = req.body;

  console.log(evaluationformbody);
  try {
    const defaultQuestions = await QuestionAnswerModel.find({});

    // Map the default questions to include both question ID and default empty answer
    const questionsWithEmptyAnswers = defaultQuestions.map((question) => ({
      questionId: question._id,
      answer: "",
    }));

    // Add the default questions (with empty answers) to the evaluation form body
    evaluationformbody.questions = defaultQuestions.map(
      (question) => question._id
    );
    evaluationformbody.answers = questionsWithEmptyAnswers;

    // Create the evaluation form with default questions
    const evaluationForm = await EvaluationFormModel.create(evaluationformbody);
    console.log(evaluationForm);
    res.status(200).json(evaluationForm);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Get All Evaluation Forms
const viewAllEvaluationForms = asyncHandler(async (req, res) => {
  try {
    const evaluationForms = await EvaluationFormModel.find()
      .sort({ createdAt: -1 })
      .populate("questions")
      .populate("evaluator", "username") // Populate evaluator with only the name field
      .populate("evaluatedTA", "name"); // Populate evaluated TA with only the name field

    // evaluationForms.forEach(form => {
    //   form.questions.forEach(question) = form.answers.map(answer => ({
    //     questionId: answer.questionId,
    //     answer: answer.answer
    //   }));
    // });

    res.status(200).json(evaluationForms);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const evaluationForm = await EvaluationFormModel.findById(id)
      .populate("questions") // Populate the questions field with actual question data
      .exec();

    if (!evaluationForm) {
      res.status(404).json({ error: "Evaluation Form not found" });
      return;
    }
    
    // Access the first answer in the answers array
    // console.log(evaluationForm.answers[0].answer[0]);

    res.status(200).json(evaluationForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update evaluation form title or instructor by ID
const updateEvaluationForm = asyncHandler(async (req, res) => {
  const { evaluationFormId, questionAnswerId } = req.params;
  const { answer, questionType } = req.body;

  try {
    const evaluationForm = await EvaluationFormModel.findById(evaluationFormId);

    if (!evaluationForm) {
      return res.status(404).json({ error: "Evaluation form not found" });
    }

    const answerIndex = evaluationForm.answers.findIndex(
      (a) => a.questionId.toString() === questionAnswerId
    );

    let updatedAnswer;

    switch (questionType) {
      case "Text":
        updatedAnswer = [answer];
        break;
      case "Rating":
        updatedAnswer = [parseInt(answer)];
        break;
      case "Multiple Choice":
        updatedAnswer = [answer];
        break;
      case "Checkbox":
        // For checkboxes, ensure answer is an array and update multiple selections
        if (!Array.isArray(answer)) {
          return res
            .status(400)
            .json({ error: "Checkbox answer should be an array" });
        }
        updatedAnswer = answer;
        break;
      default:
        return res.status(400).json({ error: "Invalid question type" });
    }

    if (answerIndex > -1) {
      evaluationForm.answers[answerIndex].answer = updatedAnswer;
    } else {
      evaluationForm.answers.push({
        questionId: questionAnswerId,
        answer: updatedAnswer,
      });
    }

    const updatedEvaluationForm = await evaluationForm.save();
    res.status(200).json(updatedEvaluationForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  addEvaluationForm,
  viewAllEvaluationForms,
  viewEvaluationForm,
  updateEvaluationForm,
};

const EvaluationFormModel = require("../model/EvaluationForm");
const QuestionAnswerModel = require("../model/QuestionAnswer");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const InstructorModel = require("../model/Instructor");
const TaModel = require("../model/Ta");
const UserModel = require("../model/User");

// Add Evaluation Form
const addEvaluationForm = asyncHandler(async (req, res) => {
  const evaluationformbody = req.body;
  console.log(evaluationformbody);
  const id = req.user.id;
  const user = await UserModel.findById(id);
  console.log(user);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  try {
    const defaultQuestions = await QuestionAnswerModel.find({});
    console.log(defaultQuestions);

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
    const evaluationForm = await EvaluationFormModel.create({
      evaluator: id,
      questions: evaluationformbody.questions,
      answers: evaluationformbody.answers,
      instructor: evaluationformbody.instructor,
      evaluatedTA: evaluationformbody.evaluatedTA,
      course: evaluationformbody.course,
      semester: evaluationformbody.semester,
    });
    console.log(evaluationForm);
    res.status(200).json(evaluationForm);
  } catch (error) {
    console.log("mo4kela");

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
    // console.log(evaluationForm.answers[1].answer);

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
        updatedAnswer = [answer]; // Might remove array brackects, since the it is only a single answer
        break;
      case "Rating":
        updatedAnswer = [parseInt(answer)]; // Might remove array brackects, since the it is only a single answer
        break;
      case "Multiple Choice":
        updatedAnswer = [answer]; // Might remove array brackects, since the it is only a single answer
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

// Delete Eval Form Controller
const deleteEvaluationForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Evaluation Form ID" });
  }

  try {
    const evaluationForm = await EvaluationFormModel.findByIdAndDelete(id);

    res.status(200).json(evaluationForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get instrutor id from name (with try catch)
const getInstructorId = asyncHandler(async (req, res) => {
  try {
    const instructorName = req.body.instructorName;
    const instructor = await InstructorModel.findOne({
      username: instructorName,
    });
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    //get only the id field from instructor
    const instructorId = instructor._id.toString();
    console.log(instructorId);

    res.status(200).json(instructorId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get TA id from name (with try catch)
const getTAId = asyncHandler(async (req, res) => {
  console.log("dm");

  try {
    const taName = req.body.taName;
    const ta = await TaModel.findOne({ name: taName });
    if (!ta) {
      console.log("no taaaaaaa");

      return res.status(404).json({ error: "TA not found" });
    }
    const taId = ta._id.toString();
    console.log(taId);

    res.status(200).json(taId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Instructor Name from ID
const getInstructorName = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Use query parameter for GET requests
    if (!id) {
      return res.status(400).json({ error: "Instructor ID is required" });
    }

    const instructor = await InstructorModel.findById(id);
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    const instructorName = instructor.username; // Assuming `username` is the field for the name
    console.log(instructorName);

    res.status(200).json(instructorName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get TA name by ID
const getTAName = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Use query parameter for GET requests
    console.log(id);

    if (!id) {
      return res.status(400).json({ error: "TA ID is required" });
    }

    const ta = await TaModel.findById(id);
    if (!ta) {
      return res.status(404).json({ error: "TA not found" });
    }

    const taName = ta.name; // Assuming `name` is the field for the TA's name
    console.log(taName);

    res.status(200).json(taName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get Specific user's forms
const getUserEvaluationForms = asyncHandler(async (req, res) => {
  console.log("I am in controller ");
  const id = req.user.id;
  console.log("I am in controller and this is user id: " + id);
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const forms = await EvaluationFormModel.find({ evaluator: id })
      .sort({ createdAt: -1 })
      .populate("questions")
      .populate("evaluator", "username") // Populate evaluator with only the name field
      .populate("evaluatedTA", "name");
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  addEvaluationForm,
  viewAllEvaluationForms,
  viewEvaluationForm,
  updateEvaluationForm,
  deleteEvaluationForm,
  getInstructorId,
  getTAId,
  getInstructorName,
  getTAName,
  getUserEvaluationForms,
};

const express = require("express");
const router = express.Router();

const {
  addEvaluationForm,
  viewEvaluationForm,
  viewAllEvaluationForms,
  updateEvaluationForm,
  removeEvaluationForm,
  addQuestionAnswer,
  viewAllQuestionAnswers,
  viewQuestionAnswer,
  updateQuestionAnswer,
  removeQuestionAnswer,
  getInstructorUserName,
} = require("../controller/EvaluationFormController");

router.post("/addEvaluationForm", addEvaluationForm);
router.get("/viewEvaluationForm/:id", viewEvaluationForm);
router.get("/viewAllEvaluationForms", viewAllEvaluationForms);
router.patch("/updateEvaluationForm/:id", updateEvaluationForm);
router.delete("/removeEvaluationForm/:id", removeEvaluationForm);
router.post("/addQuestionAnswer/:id", addQuestionAnswer);
router.get("/viewAllQuestionAnswers", viewAllQuestionAnswers);
router.get("/viewQuestionAnswer/:id", viewQuestionAnswer);
router.delete("/removeQuestionAnswer/:id", removeQuestionAnswer);
router.patch("/updateQuestionAnswer/:id", updateQuestionAnswer);
router.get("/getInstructorUserName/:evaluationFormId", getInstructorUserName);

module.exports = router;

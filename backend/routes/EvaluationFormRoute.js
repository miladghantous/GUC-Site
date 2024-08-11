const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/AuthenticationHandler")

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

router.post("/addEvaluationForm", protect, addEvaluationForm);
router.get("/viewEvaluationForm/:id",protect, viewEvaluationForm);
router.get("/viewAllEvaluationForms", protect,viewAllEvaluationForms);
router.patch("/updateEvaluationForm/:id",protect, updateEvaluationForm);
router.delete("/removeEvaluationForm/:id",protect, removeEvaluationForm);
router.post("/addQuestionAnswer/:id",protect, addQuestionAnswer);
router.get("/viewAllQuestionAnswers", protect,viewAllQuestionAnswers);
router.get("/viewQuestionAnswer/:id", protect,viewQuestionAnswer);
router.delete("/removeQuestionAnswer/:id",protect, removeQuestionAnswer);
router.patch("/updateQuestionAnswer/:id",protect, updateQuestionAnswer);
router.get("/getInstructorUserName/:evaluationFormId", protect,getInstructorUserName);

module.exports = router;

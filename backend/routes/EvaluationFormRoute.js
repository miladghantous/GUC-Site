const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/AuthenticationHandler");

const {
  addEvaluationForm,
  viewEvaluationForm,
  viewAllEvaluationForms,
  updateEvaluationForm,
  deleteEvaluationForm,
} = require("../controller/EvaluationFormController");

router.post("/addEvaluationForm", addEvaluationForm);
router.get("/viewEvaluationForm/:id", viewEvaluationForm);
router.get("/viewAllEvaluationForms", viewAllEvaluationForms);
router.patch("/updateEvaluationForm/:evaluationFormId/answers/:questionAnswerId",updateEvaluationForm);
router.delete("/deleteEvaluationForm/:id", deleteEvaluationForm);

module.exports = router;

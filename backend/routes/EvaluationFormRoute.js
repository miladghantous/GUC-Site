const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/AuthenticationHandler");
const { checkInstructorRole } = require("../middleware/AccessHandler");

const {
  addEvaluationForm,
  viewEvaluationForm,
  viewAllEvaluationForms,
  updateEvaluationForm,
  deleteEvaluationForm,
  getInstructorId,
  getTAId,
  getInstructorName,
  getTAName,
  getUserEvaluationForms,
} = require("../controller/EvaluationFormController");

router.post(
  "/addEvaluationForm",
  protect,
  checkInstructorRole,
  addEvaluationForm
);
router.get("/viewEvaluationForm/:id", viewEvaluationForm);
router.get("/viewAllEvaluationForms", viewAllEvaluationForms);
router.patch(
  "/updateEvaluationForm/:evaluationFormId/answers/:questionAnswerId",
  updateEvaluationForm
);
router.delete("/deleteEvaluationForm/:id", deleteEvaluationForm);
router.post("/getInstructorId", getInstructorId);
router.post("/getTAId", getTAId);
router.get("/getInstructorName/:id", getInstructorName);
router.get("/getTAName/:id", getTAName);
router.get("/getUserEvaluationForms", protect, getUserEvaluationForms);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  addQuestionAnswer,
  viewAllQuestionAnswers,
} = require("../controller/QuestionAnswerController");

router.post("/addQuestionAnswer", addQuestionAnswer);
router.get("/viewAllQuestionAnswers", viewAllQuestionAnswers);

module.exports = router;

const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/AuthenticationHandler")

const {
  addInstructor,
  removeInstructor,
  viewInstructor,
  viewAllInstructors,
  updateInstructor,
} = require("../controller/InstructorController");

router.post("/addInstructor", protect ,addInstructor);
router.delete("/removeInstructor/:id",protect, removeInstructor);
router.get("/viewInstructor/:id",protect, viewInstructor);
router.get("/viewAllInstructors",protect, viewAllInstructors);
router.patch("/updateInstructor/:id",protect, updateInstructor);

module.exports = router;

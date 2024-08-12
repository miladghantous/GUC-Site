const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/AuthenticationHandler")
const {checkAdminRole} = require('../middleware/AccessHandler')

const {
  addInstructor,
  removeInstructor,
  viewInstructor,
  viewAllInstructors,
  updateInstructor,
} = require("../controller/InstructorController");

router.post("/addInstructor", protect , checkAdminRole , addInstructor);
router.delete("/removeInstructor/:id",protect, removeInstructor);
router.get("/viewInstructor/:id",protect, viewInstructor);
router.get("/viewAllInstructors",protect, viewAllInstructors);
router.patch("/updateInstructor/:id",protect, updateInstructor);

module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/AuthenticationHandler");
const { checkAdminRole } = require("../middleware/AccessHandler");
const { checkInstructorRole } = require("../middleware/AccessHandler");

const {
  addComplaint,
  viewAllComplaints,
  viewComplaint,
  removeComplaint,
  updateComplaint,
  changeStatus,
  editReply,
  getUserComplaints,
} = require("../controller/ComplaintController");

router.post("/addComplaint", protect, checkInstructorRole, addComplaint);
router.get("/viewAllComplaints",  viewAllComplaints);
router.get("/viewComplaint/:id", viewComplaint);
router.delete("/removeComplaint/:id", removeComplaint);
router.patch("/updateComplaint/:id", updateComplaint);
router.patch("/changeStatus/:id", protect, checkAdminRole, changeStatus);
router.patch("/editReply/:id", protect, checkAdminRole, editReply);
router.get("/getUserComplaints", protect, getUserComplaints
);

module.exports = router;

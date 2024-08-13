const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/AuthenticationHandler");
const {checkAdminRole} = require('../middleware/AccessHandler')


const {
  addTa,
  updateTa,
  removeTa,
  viewAllTas,
  viewTa,
  searchByName,
  checkIfTaExists,
} = require("../controller/TaController");

router.post("/addTa", protect,checkAdminRole, addTa);
router.delete("/removeTa/:id", protect,checkAdminRole, removeTa);
router.get("/viewTa/:id", viewTa);
router.get("/viewAllTas", viewAllTas);
router.patch("/updateTa/:id", protect,checkAdminRole,  updateTa);
router.get("/searchByName/:name", searchByName);
router.post("/checkIfExists/:name", protect,checkAdminRole,  checkIfTaExists);

module.exports = router;

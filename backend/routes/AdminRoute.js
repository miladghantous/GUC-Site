const express = require('express');
const router = express.Router();
const {protect} = require("../middleware/AuthenticationHandler")

const {
    addAdmin,
    removeAdmin,
    viewAdmin,
    viewAllAdmins,
    updateAdmin,

} = require('../controller/AdminController')

router.post('/addAdmin', protect, addAdmin)
router.delete('/removeAdmin/:id', protect,removeAdmin)
router.get('/viewAdmin/:id',protect, viewAdmin)
router.get('/viewAllAdmins',protect, viewAllAdmins)
router.patch('/updateAdmin/:id', protect,updateAdmin)


module.exports = router

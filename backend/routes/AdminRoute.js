const express = require('express');
const router = express.Router();


const {
    addAdmin,
    removeAdmin,
    viewAdmin,
    viewAllAdmins,
    updateAdmin,

} = require('../controller/AdminController')

router.post('/addAdmin', addAdmin)
router.delete('/removeAdmin/:id', removeAdmin)
router.get('/viewAdmin/:id', viewAdmin)
router.get('/viewAllAdmins', viewAllAdmins)
router.patch('/updateAdmin/:id', updateAdmin)


module.exports = router

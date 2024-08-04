const express = require('express');
const router = express.Router();


const {
    addComplaint,
    viewAllComplaints,
    viewComplaint,
    removeComplaint,
    updateComplaint

} = require('../controller/ComplaintController')

router.post('/addComplaint', addComplaint)
router.get('/viewAllComplaints', viewAllComplaints)
router.get('/viewComplaint/:id', viewComplaint)
router.delete('/removeComplaint/:id', removeComplaint)
router.patch('/updateComplaint/:id', updateComplaint)


module.exports = router

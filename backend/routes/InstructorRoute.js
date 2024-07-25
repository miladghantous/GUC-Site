const express = require('express');
const router = express.Router();


const {
    addInstructor,
    removeInstructor,
    viewInstructor,
    viewAllInstructors,
    updateInstructor,

} = require('../controller/InstructorController')

router.post('/addInstructor', addInstructor)
router.delete('/removeInstructor/:id', removeInstructor)
router.get('/viewInstructor/:id', viewInstructor)
router.get('/viewAllInstructors', viewAllInstructors)
router.put('/updateInstructor/:id', updateInstructor)


module.exports = router

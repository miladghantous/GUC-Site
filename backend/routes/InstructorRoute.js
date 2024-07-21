const express = require('express');
const router = express.Router();


const {
    addInstructor,
    removeInstructor,
    viewInstructor,
    viewInstructors,
    updateInstructor,

} = require('../controller/InstructorController')

router.post('/addInstructor', addInstructor)
router.delete('/removeInstructor/:id', removeInstructor)
router.get('/getInstructor/:id', viewInstructor)
router.get('/getAllInstructors', viewInstructors)
router.put('/update/:id', updateInstructor)


module.exports = router

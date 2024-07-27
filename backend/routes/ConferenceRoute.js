const express = require('express');
const router = express.Router();


const {
    addConference,
    viewConference,
    viewAllConferences,
    updateConference,
    removeConference
} = require('../controller/ConferenceController')

router.post('/addConference',addConference)
router.get('/viewConference/:id',viewConference)
router.get('/viewAllConferences',viewAllConferences)
router.patch('/updateConference/:id',updateConference)
router.delete('/removeConference/:id',removeConference)


module.exports = router

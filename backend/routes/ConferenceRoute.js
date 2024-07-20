const express = require('express');
const router = express.Router();


const {
    addConference,
    viewConference,
    viewConferences
} = require('../controller/ConferenceController')

router.post('/addConference',addConference)
router.get('/getConference/:id',viewConference)
router.get('/getAllConferences',viewConferences)


module.exports = router

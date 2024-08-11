const express = require('express');
const router = express.Router();
const {protect} = require("../middleware/AuthenticationHandler")


const {
    addAnnouncement,
    viewAllAnnouncements,
    viewAnnouncement,
    removeAnnouncement,
    updateAnnouncement

} = require('../controller/AnnouncementController')

router.post('/addAnnouncement', addAnnouncement)
router.get('/viewAllAnnouncements', viewAllAnnouncements)
router.get('/viewAnnouncement/:id', viewAnnouncement)
router.delete('/removeAnnouncement/:id', removeAnnouncement)
router.patch('/updateAnnouncement/:id', updateAnnouncement)


module.exports = router

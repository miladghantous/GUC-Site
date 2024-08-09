const express = require('express');
const router = express.Router();


const {
    addFileLink,
    viewFileLink,
    removeFileLink,
    updateFileLink,
    viewAllFileLinks,
    searchBySubject

} = require('../controller/FileLinkController')

router.post('/addFileLink', addFileLink)
router.get('/viewAllFileLinks', viewAllFileLinks)
router.get('/viewFileLink/:id', viewFileLink)
router.delete('/removeFileLink/:id', removeFileLink)
router.patch('/updateFileLink/:id', updateFileLink)
router.get('/searchBySubject/:subject', searchBySubject)


module.exports = router

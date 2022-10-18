const express = require('express');
const { CreateJobContoler,jobWithHrId } = require('../Controller/job.contoler');
const { authorization } = require('../Middleware/authorization');
const router= express.Router();
const verifyToken = require('../Middleware/verifyToken');
// Importing the controller
router.post('/',verifyToken,authorization('Hrmanager','admin'),CreateJobContoler)
// --------get job with hrmanager id
router.get('/hrId',verifyToken,authorization('Hrmanager','admin'),jobWithHrId)

module.exports = router;
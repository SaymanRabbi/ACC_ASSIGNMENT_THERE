const express = require('express');
const { CreateJobContoler } = require('../Controller/job.contoler');
const router= express.Router();

// Importing the controller
router.post('/',CreateJobContoler)

module.exports = router;
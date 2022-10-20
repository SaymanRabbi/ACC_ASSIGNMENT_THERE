const express = require('express');
const { CreateJobContoler,jobWithHrId,jobWithId,updatejobWithId,getAlljobs,getJobWithHrInfo,applyJobControler,getsalary,getmostapply } = require('../Controller/job.contoler');
const { authorization } = require('../Middleware/authorization');
const { verifyCandidate } = require('../Middleware/candidate');
const router= express.Router();
const verifyToken = require('../Middleware/verifyToken');
const { uploadFile } = require('../uploadDrive');
const { upload } = require('../uploadFile');
//highest salary
router.get("/salary",getsalary)
router.get("/mostapply",getmostapply)
// Importing the controller
router.post('/',verifyToken,authorization('Hrmanager','admin'),CreateJobContoler)
// --------get job with hrmanager id
router.get('/hrId',verifyToken,authorization('Hrmanager','admin'),jobWithHrId)
// ----------get job hrmanager id and job id
router.get('/hrId/:id',verifyToken,authorization('Hrmanager','admin'),jobWithId)
//----------->update job with id
router.patch("/:id",verifyToken,authorization('Hrmanager','admin'),updatejobWithId)
//----------->get all jobs with sort and filter
router.get('/',getAlljobs)
// ----------->get job with hrmanager 
router.get('/:id',getJobWithHrInfo)
// apply job with verify candidate
router.post('/:id/apply',upload.single('resume'),uploadFile,verifyToken,verifyCandidate,applyJobControler)
module.exports = router;
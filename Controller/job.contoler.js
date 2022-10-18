const { CreateJobServices, jobWithHrIdServices,jobWithIdServices,updatejobWithIdServices, getAllJobsServices } = require("../Services/job.services");

module.exports.CreateJobContoler=async(req,res)=>{
    try {
        const job = await CreateJobServices(req.body);
        job.HrManagerid = req.hrId;
        await job.save();
        res.status(201).json({
            status: 'success',
            data: {
                job
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
module.exports.jobWithHrId = async (req, res) => {
    try {
        const jobs = await jobWithHrIdServices(req.hrId);
        res.status(201).json({
            status: 'success',
            data: {
                jobs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
module.exports.jobWithId = async (req, res) => {
    try {
        const job = await jobWithIdServices(req.hrId, req.params.id);
        res.status(201).json({
            status: 'success',
            data: {
                job
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Job Not Found or you are not authorized'
        })
    }
}
module.exports.updatejobWithId = async (req, res) => {
    try {
        const job = await updatejobWithIdServices(req.params.id,req.hrId,req.body);
        res.status(201).json({
            status: 'update job success',
            data: {
                job
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Job Not Found or you are not authorized'
        })
    }
}
// -----api http://localhost:5000/job?address=Rangpur-Bangladesh&postition=Fullstack-Developer&sallery[lt]=10000
// ------------>>>>>>Get All Jobs with sort and filter
module.exports.getAlljobs = async (req, res) => {
    try {
    let queryObj = {...req.query} ;
    // -------->>>>Cxlude some fields from query
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);
    // -------->>>>Cxlude some fields from query
    const filterObj = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    queryObj = JSON.parse(filterObj);
   const queris={}
   // -------->>>>sorting
   if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    queris.sort=sortBy
   }
//--------->>>>>fields
if(req.query.fields){
    const fields = req.query.fields.split(',').join(' ');
    queris.fields=fields
}
       const jobs = await getAllJobsServices(queryObj,queris);
        res.status(201).json({
            status: 'success',
            data: {
                jobs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })    
    }
}
// ------------>>>>>>Get All Jobs with sort and filter
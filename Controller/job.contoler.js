const { CreateJobServices, jobWithHrIdServices,jobWithIdServices,updatejobWithIdServices } = require("../Services/job.services");

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
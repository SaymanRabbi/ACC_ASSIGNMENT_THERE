const { CreateJobServices } = require("../Services/job.services");

module.exports.CreateJobContoler=async(req,res)=>{
    try {
        const job = await CreateJobServices(req.body);
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
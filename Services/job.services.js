const Job = require('../Models/job');
module.exports.CreateJobServices=async(data)=>{
    const job = await Job.create(data);
    return job
}
module.exports.jobWithHrIdServices = async (hrId) => {
    const jobs = await Job.find({ HrManagerid: hrId });
    return jobs
}
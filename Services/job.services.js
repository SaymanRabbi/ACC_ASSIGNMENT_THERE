const Job = require('../Models/job');
module.exports.CreateJobServices=async(data)=>{
    const job = await Job.create(data);
    return job
}
module.exports.jobWithHrIdServices = async (hrId) => {
    const jobs = await Job.find({ HrManagerid: hrId });
    return jobs
}
module.exports.jobWithIdServices = async (hrId, id) => {
    const job = await Job.findOne({ $and: [{ _id: id },{ HrManagerid: hrId }] });
    if(!job){
        throw new Error('job not found')
    }
    return job
}
module.exports.updatejobWithIdServices=async(id,hrId,data)=>{
    const find = await Job.findOne({ $and: [{ _id: id },{ HrManagerid: hrId }] });
    if(!find){
        throw new Error('job not found')
    }
    const job = await Job.updateOne({ _id: id }, data);
    return job
}
// -------------------->>>>>>>>Get All Jobs with sort and filter <<<<<<<<<<<<<<<<<<<<------------------
module.exports.getAllJobsServices = async (queryObj) => {
    const jobs = await Job.find({queryObj});
    return jobs
}
// -------------------->>>>>>>>Get All Jobs with sort and filter <<<<<<<<<<<<<<<<<<<<------------------
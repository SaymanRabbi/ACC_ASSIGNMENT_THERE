const Job = require('../Models/job');
const User = require('../Models/User');
const AppliedJob = require("../Models/AppliedJob");
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
module.exports.getAllJobsServices = async (queryObj,queris) => {
    const jobs = await Job.find(queryObj).select(queris.fields).sort(queris.sort);
    return jobs
}
// -------------------->>>>>>>>Get All Jobs with sort and filter <<<<<<<<<<<<<<<<<<<<------------------
// ---------get job with hr info
module.exports.jobWithHrIdServicesinfo = async (id) => {
    const job = await Job.findById(id).populate('HrManagerid','-token -password -_id -isVerified');
    return job
}
// ---------get job with hr info

//=======apply jop controler

module.exports.findJobWithId=async(id)=>{
    const job = await Job.findById(id);
    return job
}
module.exports.findUserWithId=async(id)=>{
    const user = await User.findById(id);
    return user
}
exports.applyJobService = async ({ jobId, candidate, infoId }) => {
    await User.findByIdAndUpdate(candidate, { $push: { appliedJobs: jobId } });
    const result = await Job.findByIdAndUpdate(
      jobId,
      { $push: { appliedCandidates: { candidate, candidateInfo: infoId } } },
      { new: true }
    );
    return result;
  };
  
  exports.saveAppliedCandidateInfoService = async (data, candidate, jobId) => {
    const result = await AppliedJob.create({
      ...data,
      userId: candidate,
      jobId: jobId,
    });
    return result;
  };
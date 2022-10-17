const Job = require('../Models/job');
module.exports.CreateJobServices=async(data)=>{
    const job = await Job.create(data);
    return job
}
const { CreateJobServices, jobWithHrIdServices,jobWithIdServices,updatejobWithIdServices, getAllJobsServices,jobWithHrIdServicesinfo,findJobWithId,findUserWithId,saveAppliedCandidateInfoService,applyJobService} = require("../Services/job.services");
const Job = require("../Models/Job.model");
// ----------create job with hr id
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
// -------------get job with hr id
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
// ------------get job with id
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
// -------------->>>>>Update job with id
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
// -------------->>>>>Update job with id
// ----->>>api http://localhost:5000/job?address=Rangpur-Bangladesh&postition=Fullstack-Developer&sallery[lt]=10000
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

// ----------get job with hr info
// http://localhost:5000/job/634e25d0814b3565ab7594ea
module.exports.getJobWithHrInfo = async (req, res) => {
    try {
        const {id} = req.params;
        const jobs = await jobWithHrIdServicesinfo(id);
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
// apply job 
module.exports.applyJobControler = async (req, res) => {
    const _id = req.params.id;
    const {resume,coverLetter} = req.body
    if( !resume || !coverLetter){
        return res.status(400).json({
            status: 'fail',
            message: 'Please Provide all fields'
        })
    }
    try {
        const candidate = req._id;
        const job = await findJobWithId(_id)
        const user = await findUserWithId(candidate)
        if(!job){
            return res.status(400).json({
                status: 'fail',
                message: 'Job Not Found'
            })
        }
        if(!user){
            return res.status(400).json({
                status: 'fail',
                message: 'User Not Found'
            })
        }
        if(job.Vacancy <= 0){
            return res.status(400).json({
                status: 'fail',
                message: 'No Vacancy available'
            })
        }
        const isApplied = await Job.findOne({
            $and: [{ _id }, { "appliedCandidates.candidate": candidate }],
          });
          if (isApplied)
            return res.status(400).send({
              success: false,
              message: "You have already applied for this job.",
});
        if(job.deadLine < Date.now()){
            return res.status(400).json({
                status: 'fail',
                message: 'Job Deadline is over'
            })
        }
        const savedAppliedCandidateInfo = await saveAppliedCandidateInfoService(
            req.body,
            candidate,
            _id
          );
          const applyJob = await applyJobService({
            candidate,
            jobId: _id,
            infoId: savedAppliedCandidateInfo._id,
          });
      
          if (!applyJob)
            return res.status(400).send({
              success: false,
              message: "Something went wrong.",
            });
            job.Vacancy = job.Vacancy - 1;
            await job.save();
          res.status(202).send({
            success: true,
            message: "Applied Job successfully done.",
          });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
module.exports.getsalary= async(req,res)=>{
    try {

        const jobs = await Job.find().sort({sallery:-1}).select('-appliedCandidates -HrManagerid');
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

module.exports.getmostapply= async(req,res)=>{
    try {
        const jobs = await Job.find().sort({appliedCandidates:-1}).select('-HrManagerid');
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
       
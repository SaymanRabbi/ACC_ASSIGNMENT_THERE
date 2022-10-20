const mongoose = require('mongoose');
const validator = require('validator');

const AppliedJobSchema = new mongoose.Schema({
    jobId:{
        type:mongoose.Types.ObjectId,
        ref:"Job"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    resume: {
        type: String,
        required: true,
        validate: [validator.isURL, 'Please add a valid URL']
    },
    coverLetter: {
        type: String,
        required: true,
    },
    
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    appliedDate:{
        type:Date,
        default:Date.now()
    }
},{
    timestamps:true
})

const AppliedJob = mongoose.model('AppliedJob', AppliedJobSchema);
module.exports = AppliedJob;
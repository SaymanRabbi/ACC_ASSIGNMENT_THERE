const mongoose = require('mongoose');
const validator = require('validator');
const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [40, 'Title can not be more than 40 characters'],
        minlength: [3, 'Title can not be less than 3 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters'],
        minlength: [10, 'Description can not be less than 10 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please add a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        validate: [validator.isMobilePhone, 'Please add a valid phone number']
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        maxlength: [100, 'Address can not be more than 100 characters'],
        minlength: [10, 'Address can not be less than 10 characters']
    },
    postition:{
        type: String,
        required: [true, 'Please add a position'],
        enum:{
            values:['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
            message: 'Please select a position {VALUE}'
        }
    },
    sallery:{
        type: Number,
        required: [true, 'Please add a sallery'],
        min: [1000, 'Sallery can not be less than $1000'],
    },
    deadLine:{
        type: Date,
        default: Date.now() + 7*24*60*60*1000,
    },
    Vacancy:{
        type: Number,
        required: [true, 'Please add a vacancy'],
        min: [1, 'Vacancy can not be less than 1'],
    },
    HrManagerid:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps: true
})
const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
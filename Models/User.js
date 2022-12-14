const mongoose = require('mongoose');
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [40, 'Name can not be more than 40 characters'],
        minlength: [3, 'Name can not be less than 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate:{
            validator:(value)=>validator.isStrongPassword(value,{
                minLength:6,
                minLowercase:3,
                minUppercase:1,
                minNumbers:1,
                minSymbols:1,
            }),
            messages:'Password {value} is not strong enough'
        }
     },
    role:{
        type:String,
        enum:['user','Hrmanager','admin','candidate'],
        required: [true, 'Please add a role'],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    appliedJobs: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Job"
        }
    ],  
    token:String
},{
    timestamps:true
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
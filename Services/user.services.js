const User = require('../Models/User');
const bcrypt = require('bcryptjs')
// -------------->Create user-----------------
module.exports.CreateUserServices=async(data)=>{
    const {password} = data;
    const hashpassword =await bcrypt.hash(password,12)
    const user = await User.create({
        ...data,
        password:hashpassword
    });
    return user
}
// -------------->Create user-----------------
// -------------->Login user-----------------
module.exports.FindUserServices=async(userinfo)=>{

    const {email,password} = userinfo;
    if(!email || !password){
        throw new Error("Please provide email and password");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User Not Found")
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Password is Incorrect")
    }
    return user;
}
// -------------->Login user-----------------
// -------------->Get user info-----------------
module.exports.getUserInfoServices=async(id)=>{
    const user = await User.findById(id);
    return user;
}
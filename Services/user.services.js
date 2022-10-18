const User = require('../Models/User');
const bcrypt = require('bcryptjs');
module.exports.CreateUserServices=async(data)=>{
    const {password} = data;
    const hashpassword =await bcrypt.hash(password,12)
    const user = await User.create({
        ...data,
        password:hashpassword
    });
    return user
}
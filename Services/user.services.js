const User = require('../Models/User');
module.exports.CreateUserServices=async(data)=>{
    const user = await User.create(data);
    return user
}
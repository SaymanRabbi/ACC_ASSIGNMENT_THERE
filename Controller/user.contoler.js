const { genarateToken } = require("../helper/token");
const { CreateUserServices, FindUserServices, getUserInfoServices } = require("../Services/user.services");

module.exports.CreateUserContoler=async(req,res)=>{
    try {
        const user = await CreateUserServices(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
module.exports.loginUserControler = async (req, res) => {
    try {
        const user = await FindUserServices(req.body);
         const token =  genarateToken(user)
         user.token = token;
        await user.save({validateBeforeSave:false})
        res.status(201).json({
            status: 'login success',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
module.exports.getUserInfo=async(req,res)=>{
    try {
        const id = req.userData._id
        const user = await getUserInfoServices(id);
        res.status(201).json({
            status: 'success',  
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
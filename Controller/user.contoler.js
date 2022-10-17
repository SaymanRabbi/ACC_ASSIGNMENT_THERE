const { genarateToken } = require("../helper/token");
const { CreateUserServices } = require("../Services/user.services");

module.exports.CreateUserContoler=async(req,res)=>{
    try {
        const user = await CreateUserServices(req.body);
         await user.tokenConfirmation()
         const token =  genarateToken(user)
        await user.save({validateBeforeSave:false})
        res.status(201).json({
            status: 'success',
            data: {
                user
            },
            token

        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
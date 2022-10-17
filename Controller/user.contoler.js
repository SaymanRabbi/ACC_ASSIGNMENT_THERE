const { CreateUserServices } = require("../Services/user.services");

module.exports.CreateUserContoler=async(req,res)=>{
    try {
        const user = await CreateUserServices(req.body);
        const token = await user.tokenConfirmation()
        await user.save({validateBeforeSave:false})
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
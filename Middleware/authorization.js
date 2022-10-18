module.exports.authorization=(...role)=>{
    return (req,res,next)=>{
     const userRole = req.userData.role;
     if(!role.includes(userRole)){
         return res.status(401).send({
             status:false,
             message:"You are not authorized to access this route"
         })
     }
    // --------insert hrmanager id with req
     req.hrId = req.userData._id
     next();
 
    }
 }
module.exports.authorization=(...role)=>{
    return (req,res,next)=>{
     const userRole = req.userData.role;
     if(!role.includes(userRole)){
         return res.status(401).send({
             status:false,
             message:"You are not authorized to access this route"
         })
     }
     next();
 
    }
 }
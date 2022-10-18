const jwt = require('jsonwebtoken');
module.exports.genarateToken = (user) => {
    const payload = {
        email: user.email,
        role: user.role,
        _id:user._id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1year'    
    })
    return token;
}
const User = require('../Models/User');
module.exports.getAllCandidate = async () => {
   const candidates = await User.find({ role: "candidate" }).select("-token")
    return candidates
}
module.exports.candidateWithIdServices = async (id) => {
    const candidate = await User.findById(id).select("-token")
    return candidate
}
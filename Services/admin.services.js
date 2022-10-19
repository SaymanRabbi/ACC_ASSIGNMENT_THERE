const User = require('../Models/User');
module.exports.getAllCandidate = async () => {
   const candidates = await User.find({ role: "candidate" }).select("-token -password")
    return candidates
}
module.exports.candidateWithIdServices = async (id) => {
    const candidate = await User.findById(id).select("-token -password")
    return candidate
}
module.exports.gethiringmanagersServices = async () => {
    const hiringmanagers = await User.find({ role: "Hrmanager" }).select("-token -password")
    return hiringmanagers
}
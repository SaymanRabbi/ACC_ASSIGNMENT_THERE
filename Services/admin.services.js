const { changesRole } = require('../helper/changes.role');
const User = require('../Models/User');
module.exports.getAllCandidate = async () => {
   const candidates = await User.find({ role: "candidate" }).select("-token -password")
    return candidates
}
module.exports.candidateWithIdServices = async (id) => {
    const candidate = await User.findById(id).populate('appliedJobs','-HrManagerid -appliedCandidates -Vacancy').select("-token -password")
    return candidate
}
module.exports.gethiringmanagersServices = async () => {
    const hiringmanagers = await User.find({ role: "Hrmanager" }).select("-token -password")
    return hiringmanagers
}
module.exports.getuserwithIdServices = async (id) => {
    const user = await User.findOne({ _id: id })
    if(user.role==="Hrmanager"){
        throw new Error("Alredy role of Hrmanager")
    }
    user.role = "Hrmanager"
    const token=changesRole(user)
    user.token=token
    await user.save()
    return user;
}
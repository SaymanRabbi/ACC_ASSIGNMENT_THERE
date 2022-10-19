const { getAllCandidate,candidateWithIdServices,gethiringmanagersServices,getuserwithIdServices } = require("../Services/admin.services")

module.exports.getAllCandidate = async (req, res) => {
    try {
        const candidates = await getAllCandidate()
        res.status(200).send({
            status: true,
            message: "All Candidate",
            data: candidates
        })
        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Not Get Any Candidate"
        })
    }
}
module.exports.candidateWithId= async (req, res) => {
    try {
        const id = req.params.id;
        const candidate = await candidateWithIdServices(id);
        res.status(200).send({
            status: true,
            message: "Candidate With Id",
            data: candidate
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Not Get Any Candidate"
        })
    }
}
module.exports.gethiringmanagers = async (req, res) => {
    try {
        const hiringmanagers = await gethiringmanagersServices()
        res.status(200).send({
            status: true,
            message: "All Hiring Managers",
            data: hiringmanagers
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Not Get Any Hiring Managers"
        })
    }
}
module.exports.getuserwithId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getuserwithIdServices(id);
        res.status(200).send({
            status: true,
            message: "changes role",
            data: user
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Not Get Any user"
        })
    }
}
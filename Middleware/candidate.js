module.exports.verifyCandidate =async (req, res, next) => {
  try {
    const role = req.userData.role;
    if (role !== "candidate") {
        return res.status(401).send({
            status: false,
            message: "Unauthorized"
        })
    }
    req._id = req.userData._id
    next();
  } catch (error) {
    res.status(401).send({
        status: false,
        message: "Unauthorized"
    })
  }
}
module.exports.verifyAdmin =async (req, res, next) => {
  try {
    const role = req.userData.role;
    if (role !== "admin") {
        return res.status(401).send({
            status: false,
            message: "Unauthorized"
        })
    }
    next();
  } catch (error) {
    res.status(401).send({
        status: false,
        message: "Unauthorized"
    })
  }
}
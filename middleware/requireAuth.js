const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        console.log("Authorization Required.")
        res.status(401).json({ error: "Authorization Required." })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log("Authorization Required 2.")
        res.status(401).json({ error: "Authorization Required." })
    }

}

module.exports = requireAuth
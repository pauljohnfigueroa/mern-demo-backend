const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// create jwt
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

const registerUser = async (req, res) => {
    const { email, name, password, phone, roles } = req.body
    try {
        const user = await User.register(email, name, password, phone, roles)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {

}

module.exports = {
    registerUser,
    loginUser
}



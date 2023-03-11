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
    const { email, password } = req.body
    try {
        // using userSchema.statics.login
        // user contains the data for the created user document
        const user = await User.login(email, password)
        // create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    // get all users from the database
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
}

const getUser = async (req, res) => {
    res.status(200).json({ message: "getUser Route." })
}

const createUser = async (req, res) => {
    res.status(200).json({ message: "createUser Route." })
}

const deleteUser = async (req, res) => {
    res.status(200).json({ message: "deleteUser Route." })
}

const updateUser = async (req, res) => {
    res.status(200).json({ message: "updateUser Route." })
}



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser


}



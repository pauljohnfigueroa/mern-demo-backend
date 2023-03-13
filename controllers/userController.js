const User = require('../models/userModel')
const mongoose = require('mongoose')
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

// const createUser = async (req, res) => {
//     const { email, name, password, phone, roles } = req.body
//     try {
//         const user = await User.register(email, name, password, phone, roles)
//         const token = createToken(user._id)
//         res.status(200).json({ email, token })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

const deleteUser = async (req, res) => {
    // get the _id from the request parameters
    const { id } = req.params
    // check if _id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document." })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(400).json({ error: 'User does not exist.' })
    }
    res.status(200).json(user)
    //res.status(200).json({ message: "deleteUser Route." })
}

const updateUser = async (req, res) => {
    res.status(200).json({ message: "updateUser Route." })
}



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser


}



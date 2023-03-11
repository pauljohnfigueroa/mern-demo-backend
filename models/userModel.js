const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    roles: {
        type: String
    }
}, { timestamps: true })

// register a user
userSchema.statics.register = async function (email, name, password, phone, roles) {

    // check if fields are all filled
    if (!email || !name || !password) {
        throw Error("Please fill in all required fields.")
    }

    // Check if email is in correct format
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid.")
    }
    // Only accept strong passwords
    if (!validator.isStrongPassword(password)) {
        throw Error("Please use a strong password.")
    }
    // check is email already exists in the database
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email already exists.")
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // save the user
    const user = await this.create({ email, name, password: hash, phone, roles })
    return user
}

// login a user
userSchema.statics.login = async function (email, password) {
    // validations
    if (!email || !password) {
        throw Error("All fields are required.")
    }

    // check if email exists
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email is incorrect.')
    }

    // compare password and hash
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Password is incorrect.')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
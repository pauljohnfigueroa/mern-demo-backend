require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 4000

// Middleware
app.use(express.json())

// Routers


// Database Connection
// process is global variable available in node
// this returns a promise
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // we only want to listen to request after connecting to the database
        console.log('Successfully connected to the Database.')
        app.listen(PORT, () => {
            console.log(`Listening in port ${PORT}`)
        })
    })
    .catch(error => {
        console.error(error)
    })





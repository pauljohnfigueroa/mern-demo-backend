require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 4000
const corsOptions = require('./config/corsOptions')

// Routers
const userRouter = require('./routes/user')

// Middleware
app.use(express.json())
// Cross Origin Resource Sharing
// you must have a whitelist of allowed domains, see config/corsOptions
app.use(cors(corsOptions))

// Routes
app.use('/api/user', userRouter)

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





const express = require('express')
const router = express.Router()

// controllers
const {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')


// authentication routes

router.post('/login', loginUser)

// Protect Routes
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// Protected Routes
router.post('/register', registerUser)
router.get('/', getUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)




module.exports = router
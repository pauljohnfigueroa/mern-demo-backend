const express = require('express')
const router = express.Router()

// controllers
const {
    registerUser,
    loginUser,
    getUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')


// routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Protect Routes
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)




module.exports = router
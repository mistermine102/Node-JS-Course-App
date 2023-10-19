const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

const { login, logout, signup } = require('../controllers/auth')

router.post('/login', check('email').isEmail().withMessage('Please enter a valid email'), login)
router.post('/logout', logout)
router.post(
  '/signup',
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('password').isLength(8).withMessage('Password must be at least 8 characters long'),
  signup
)

module.exports = router

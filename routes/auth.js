const express = require('express')
const authService = require('../service/authService')
const auth = require('../middleware/authroize')

const authRoute = express.Router()

authRoute.post('/login', authService.login)
authRoute.post('/signup', authService.signUp)
authRoute.get('/logout', auth, authService.logout)

module.exports = authRoute
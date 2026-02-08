const express = require('express')
const authenticate = require('../middleware/auth/authentication')
const signup = require('./controller/signup')
const login = require('./controller/login')
const validation = require('./middleware/schema-validation')
const signupScehma = require('./validation/signup-schema')
const loginSchema = require('./validation/login-schema')
const getAllOrgDetails = require('./controller/get-all-orgs')
const router = express.Router()

router.post('/signup', validation(signupScehma), signup)
router.post('/login', validation(loginSchema), login)
router.get('/all-org/:id', authenticate, getAllOrgDetails)




module.exports = router;
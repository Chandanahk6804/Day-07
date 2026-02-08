const express = require('express')
const validation = require('./middleware/org-validation')
const orgSchema = require('./validation/org-schema')
const addUserSchema = require('./validation/add-user-schema')
const createOrg = require('./controller/create-org')
const getAllUsers = require('./controller/get-all-user')
const addUser = require('./controller/add-user')
const authenticate = require('../middleware/auth/authentication')
const authorize = require('../middleware/auth/authorization')
const router = express.Router()

const roles = ["R001", "R002"]

router.post('/create-org', authenticate, validation(orgSchema), createOrg);
router.post('/add-user/:orgId', authenticate, authorize(roles[0]), validation(addUserSchema), addUser)
router.get('/get-all-user/:orgId', authenticate, getAllUsers)







module.exports = router;
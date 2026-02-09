const express = require('express')

const createTask = require('./controller/create-task')


const authenticate = require('../middleware/auth/authentication')
const authorize = require('../middleware/auth/authorization')
const checkOrg = require('../orgs/middleware/check-org')


const roles = ["R001", "R002"]
const router = express.Router()


router.post('/create-task/:orgId', authenticate, authorize(roles), checkOrg, createTask)




module.exports = router;
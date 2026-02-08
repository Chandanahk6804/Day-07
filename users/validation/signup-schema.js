const joi = require('joi')

const signupScehma = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.number().required()
})

module.exports = signupScehma;
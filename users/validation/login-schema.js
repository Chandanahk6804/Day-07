const joi = require("joi")

const loginSchema = joi.object({
    id: joi.number().required(),
    password: joi.string().alphanum().required()
})

module.exports = loginSchema;
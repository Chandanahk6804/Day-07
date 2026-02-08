const joi = require('joi')

const addUserSchema = joi.object({
    empId: joi.number().required(),
    roleId: joi.string().alphanum().required()
})

module.exports = addUserSchema;
const joi = require('joi')

const orgSchema = joi.object({
    orgName:joi.string().required(),
    ownerId:joi.number().required(),
})

module.exports = orgSchema;
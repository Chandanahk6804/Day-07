const CustomError = require("../../utils/error-class");

const validation = (schema) => (req, res, next) => {
    const data = req.body.data;
    const {error} = schema.validate(data)
    if(error) {
        throw new CustomError(
            400,
            error.name,
            error.message
        )
    }
    next();
}

module.exports = validation;
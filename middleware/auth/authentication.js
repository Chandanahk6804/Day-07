const CustomError = require("../../utils/error-class");
const {jwtVerify} = require('../../utils/jwt')

const authenticate = async (req, res, next) => {
    const header = req.headers['authorization']
    if (!header) {
        throw new CustomError(
            401,
            "MissingTokenError",
            "Authorization token is required"
        )
    }
    const token = header.split(' ')[1]
    const payload = jwtVerify(token)
    res.locals.user = payload;
    //console.log(res.locals.user)
    next();
}

module.exports = authenticate;
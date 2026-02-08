const jwt = require('jsonwebtoken');
const CustomError = require('./error-class');
require('dotenv').config();


const jwtSign = (id) => {
    const token = jwt.sign({
        userId:id
    },
    process.env.JWT_SECRET)
    return token
}

const jwtVerify = (token) => {
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        //console.log(payload)
        return payload
    }
    catch (err) {
        throw new CustomError(
            401,
            err.name,
            err.message
        )
    }
}

module.exports = {jwtSign, jwtVerify}

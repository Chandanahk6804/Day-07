const {jwtSign} = require('../../utils/jwt')
const {executeQuery} = require('../../utils/db-pool');
const { checkPassword } = require('../../utils/bcrypt');
const CustomError = require('../../utils/error-class');
const { responseHandler } = require('../../utils/response-handler');

const getPasswordQuery = `
    SELECT password_hash 
    FROM user_cred
    WHERE user_id=?`

const login = async (req, res) => {
    const {id, password} = req.body;
    const [hashedPassword] = await executeQuery(getPasswordQuery, [id])
    //console.log(hashedPassword)
    const isMatch = await checkPassword(password,hashedPassword.password_hash)
    //console.log(isMatch)
    if (!isMatch) {
        throw new CustomError(
            401,
            "InvalidCredentialsError",
            "Unauthorized"
        )
    }
    const token = jwtSign(id);
    //console.log(token)
    if (!token) {
        throw new CustomError(
            500,
            "JWTGenerationError",
            "Failed to generate jwt token"
        )
    }

    responseHandler(res, {
        statusCode:200,
        message: "Login successful",
        data:token
    })
}

module.exports = login;
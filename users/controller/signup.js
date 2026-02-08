const {hashPassword} = require("../../utils/bcrypt");
const { startTransaction } = require("../../utils/db-pool");
const CustomError = require("../../utils/error-class");

const {responseHandler} = require('../../utils/response-handler')


const insertQuery = `
    INSERT INTO user (name, email, phone_number, is_active)
    VALUES (?, ?, ?, 1)`

const insertCredQuery = `
    INSERT INTO user_cred (user_id, password_hash)
    VALUES (?,?)`

const signup = async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await hashPassword(password)
        const {name, email, phoneNumber} = req.body.data;
        const queryParams = [name, email, phoneNumber]

        const results = await startTransaction(async (con) => {
            const result = [];

            
            const [userResult] = await con.query(insertQuery, queryParams);
            result.push(userResult);

            const userId = userResult.insertId; 
            const credParams = [userId, hashedPassword];

            const [credResult] = await con.query(insertCredQuery, credParams);
            result.push(credResult);

            return results;
        }); 
        responseHandler(res, {
            statusCode: 201,
            message: "User created successfully",
            data: results
        });
    }
    catch (err) {
        throw new CustomError(
            500,
            err.message
        )
    }

}
module.exports = signup;
const {executeQuery} = require('../../utils/db-pool');
const CustomError = require('../../utils/error-class');
const { responseHandler } = require('../../utils/response-handler');

let getAllUsersQuery = `
    SELECT u.name,
        r.role_name
    FROM user u
    JOIN org_joining_details od
    ON u.user_id=od.emp_id
    JOIN roles r
    ON r.role_id=od.role_id
    WHERE od.org_id=?`


const getAllUsers = async (req, res) => {
    const orgId = req.params.orgId;
    const params = [orgId]

    const {name, email, sortBy} = req.query;

    if(name) {
        getAllUsersQuery += ` AND u.name LIKE ?`
        params.push(`%${name}%`)
    }

    if(email) {
        getAllUsersQuery += ` AND u.email LIKE ?`
        params.push(`%${email}%`)
    }

    if(sortBy) {
        getAllUsersQuery += ` ORDER BY ${sortBy} ASC`
    }

    console.log(getAllUsersQuery, params)
    const result = await executeQuery(getAllUsersQuery, params)
    console.log(result)

    if(result.length == 0) {
        throw new CustomError(
            404,
            "UserNotFoundError",
            "Users not found"
        )
    }

    responseHandler(res, {
        statusCode: 200,
        message: "Users retrieved successfully",
        data: result
    })
}

module.exports = getAllUsers
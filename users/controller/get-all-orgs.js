const {executeQuery} = require('../../utils/db-pool')
const CustomError = require('../../utils/error-class')
const { responseHandler } = require('../../utils/response-handler')

let getDetailsQuery = `
    SELECT 
        o.org_name, 
        r.role_name
    FROM org_joining_details od
    JOIN organisation o
    ON o.org_id=od.org_id
    JOIN roles r
    ON od.role_id=r.role_id
    WHERE od.emp_id=?`


const getAllOrgDetails = async(req, res) => {
    const id = req.params.id
    let params = [id]
    const {roleName} = req.query
    if(roleName) {
        getDetailsQuery += ` AND r.role_name LIKE ? `
        params.push(`%${roleName}%`)
    }
    console.log(params)
    const result = await executeQuery(getDetailsQuery, params)
    console.log(result)
    if(!result) {
        throw new CustomError(
            404,
            "UserNotFoundError",
            "User not found"
        )
    }

    responseHandler(res, {
        statusCode: 200,
        message: "User details retrieved",
        data: result
    })
}

module.exports = getAllOrgDetails
const {executeQuery} = require('../../utils/db-pool')
const { responseHandler } = require('../../utils/response-handler')

const insertQuey = `
    INSERT INTO org_joining_details(emp_id, role_id, org_id)
    VALUES (?,?,?)`


const addUser = async (req, res) => {
    const {empId, roleId} = req.body
    const orgId = req.params.orgId
    const params = [empId, roleId, orgId]
    const result = await executeQuery(insertQuey, params)
    responseHandler(res, {
        statusCode: 200,
        message: "User added successfully",
        data: result
    })
}

module.exports = addUser;
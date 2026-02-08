const {executeQuery} = require('../../utils/db-pool');
const { responseHandler } = require('../../utils/response-handler');

const insertQuery = `
    INSERT INTO organisation(org_name,is_active,owner_id)
    VALUES (?,1,?)`


const createOrg = async (req, res) => {
    const {orgName, ownerId} = req.body;
    const params = [orgName, ownerId];
    const result = await executeQuery(insertQuery, params)
    responseHandler(res, {
        statusCode: 200,
        message: "Organisation created successfully",
        data: result
    })
}
module.exports = createOrg;
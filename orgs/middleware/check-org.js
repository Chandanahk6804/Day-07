// Middleware to check if the authorized owner or admin belongs to the given organisation or not

const { executeQuery } = require("../../utils/db-pool");
const CustomError = require("../../utils/error-class");

const checkOrgQuery = `
    SELECT  emp_id 
    FROM org_joining_details
    WHERE org_id = ? AND emp_id = ?`


const checkOrg = async (req, res, next) => {
    const {orgId} = req.params
    const id = res.locals.user.userId;
    const params = [orgId, id]

    const [result] = await executeQuery(checkOrgQuery, params)
    if(!result) {
        throw new CustomError(
            400,
            "OrgAccessDenied",
            "Not part of this organisation"
        )
    }
    next();
}


module.exports = checkOrg;
// Authorization middleware. 
// To check if the logged in user is an owner or a manager

const { executeQuery } = require("../../utils/db-pool");
const CustomError = require("../../utils/error-class");

const getRoleQuery = `
    SELECT role_id
    FROM org_joining_details
    WHERE emp_id=? 
        AND org_id=?`

const authorize = (roles) => async (req, res, next) => {
    const userInfo = res.locals.user;
    //console.log(userInfo)
    const id = userInfo.userId;  // To get the user id of the logged in user
    const orgId = req.params.orgId;  // Org id will be sent in url params
    const params = [id, orgId]
    const [roleInfo] = await executeQuery(getRoleQuery, params)  // To get the role of the logged in user in the given organisation

    if(!roleInfo) {     // This means the logged in user is not part of the given org
        throw new CustomError(
            403,
            "Forbidden",
            "Not allowed to invite users to this organisation"
        )
    }
    const roleId = roleInfo.role_id;
    const allowed = roles.includes(roleId)

    if (!allowed) {        // This means that even though the logged in user is a part of the given org, he is not the owner or the manager in that org
        throw new CustomError(
            403,
            "Forbidden",
            "Not authorized"
        )
    }
    next();
}

module.exports = authorize;
const {executeQuery} = require('../../utils/db-pool')

const createTaskQuery = `
    INSERT INTO task(task_name, org_id, asignee, reporter)
    VALUES (?,?,?,?)`


const createTask = async (req, res) => {
    const {orgId} = req.query;
    const {taskName, asignee, reporter} = req.body;
    const params = [taskName, asignee, reporter]

    const result = await executeQuery(createTaskQuery, params)
    console.log(result)
}

module.exports = createTask;
const express = require('express')
const userRouter = require('./users/router');
const orgRouter = require('./orgs/router')
const taskRouter = require('./task/router')


const errorHandler = require('./middleware/error-handler');


require('dotenv').config()
const app = express();

app.use(express.json())
app.use('/users', userRouter)
app.use('/orgs', orgRouter)
app.use('/tasks', taskRouter)


app.all('{*splat}',(req, res, next) => {
    res.status(404).json({status:404,message: "Page not found"})
    next();
})

app.use(errorHandler)
app.listen(process.env.PORT, () => console.log("Server is running"))
const express = require('express')
require('./db/mongoose')

//model call
const User = require('./models/user')
const Customer = require('./models/customer')
const Company = require('./models/company')

//router call
const userRouter = require('./router/user')
const customerRouter = require('./router/customer')
const companyRouter = require('./router/company')

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(customerRouter)
app.use(companyRouter)

app.listen(port, ()=>{
    console.log('port started:' + port)
})
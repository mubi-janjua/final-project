const express = require('express')
require('./db/mongoose')

//model call
const User = require('./models/user')
const Customer = require('./models/customer')
const Company = require('./models/company')
const Feed = require('./models/feedpurchase')
const Sale = require('./models/sale')
const Purchase = require('./models/purchase')

//router call
const userRouter = require('./router/user')
const customerRouter = require('./router/customer')
const companyRouter = require('./router/company')
const feedRouter = require('./router/feedpurchase')
const saleRouter = require('./router/sale')
const purchaseRouter = require('./router/purchase')

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(customerRouter)
app.use(companyRouter)
app.use(feedRouter)
app.use(saleRouter)
app.use(purchaseRouter)

app.listen(port, ()=>{
    console.log('port started:' + port)
})
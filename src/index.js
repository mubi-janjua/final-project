const express = require('express')
require('./db/mongoose')

//model call
const User = require('./models/user')
const Customer = require('./models/customer')
const Company = require('./models/company')
const Feed = require('./models/feedpurchase')
const Sale = require('./models/sale')
const Purchase = require('./models/purchase')
const Medicine = require('./models/medicine')
const Expense = require('./models/expense')

//router call
const userRouter = require('./router/user')
const customerRouter = require('./router/customer')
const companyRouter = require('./router/company')
const feedRouter = require('./router/feedpurchase')
const saleRouter = require('./router/sale')
const purchaseRouter = require('./router/purchase')
const medicineRouter = require('./router/medicine')
const expenseRouter = require('./router/expense')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(customerRouter)
app.use(companyRouter)
app.use(feedRouter)
app.use(saleRouter)
app.use(purchaseRouter)
app.use(medicineRouter)
app.use(expenseRouter)

app.listen(port, ()=>{
    console.log('port started:' + port)
})


//db lines

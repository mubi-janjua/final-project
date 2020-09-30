const mongoose = require('mongoose')
const { model } = require('./customer')

const expenseSchema = new mongoose.Schema({
    expensename: {
       type: String,
       required: true
    },

    total: {
        type: String,
        required: true
    },

    remark:{
        type: String
    }
},{
    timestamps: true
})

const Expense = mongoose.model('Expense', expenseSchema)
module.exports = Expense
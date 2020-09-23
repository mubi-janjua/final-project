const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

customerSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    
    },
    cell: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        
    },
    shopname: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
     timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer
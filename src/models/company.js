const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    
    companyname:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,

    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        default: 'nill'
    },
    country:{
        type: String,
        required: true,
        default: 'Pakistan'
    },
    cell:{
        type: String
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true
})

const Company = mongoose.model('Company', companySchema)
module.exports = Company
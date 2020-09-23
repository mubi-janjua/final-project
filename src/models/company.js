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
        type: String
    },
    country:{
        type: String,
        required: true
    },
    cell:{
        type: String
    }

}, {
    timestamps: true
})

const Company = mongoose.model('Company', companySchema)
module.exports = Company
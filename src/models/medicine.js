const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    medicinename: {
        type: String,
        required: true
    },

    rate:{
        type: String
    },
    quantity:{
        type: String
    },
    total:{
        type: String
    },
    shopname:{
        type: String
    }
})

medicineSchema.pre('save', async function (next){
    const medicine = this
    medicine.total = medicine.rate * medicine.quantity

    next()
})

const Medicine = mongoose.model('Medicine', medicineSchema)
module.exports = Medicine
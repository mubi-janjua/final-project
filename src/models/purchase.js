const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    dated: {
        type: Date
    },
    loryno:{
        type: String,
        required: true
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Customer'
    },
    chickenweight:{
        type: String
    },
    rateperkg:{
       type: String
    },
    total:{
       type: String
    }
}, {
    timestamps: true
})

purchaseSchema.pre('save', async function(next){
    const sale = this
    sale.total = sale.chickenweight * sale.rateperkg

    next()
})

const Purchase = mongoose.model('Purchase', purchaseSchema)
module.exports = Purchase
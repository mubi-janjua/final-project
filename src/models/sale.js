const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    dated: {
        type: Date
    },
    billno:{
        type: String,
        required: true
    },
    loryno:{
        type: String,
        required: true
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Company'
    },
    chickenquantity:{
        type: String
    },
    rateper:{
       type: String
    },
    price:{
       type: String
    }
}, {
    timestamps: true
})

saleSchema.pre('save', async function(next){
    const sale = this
    sale.price = sale.chickenquantity * sale.rateper

    next()
})

const Sale = mongoose.model('Sale', saleSchema)
module.exports = Sale
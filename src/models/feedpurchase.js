const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
    dated:{
        type: Date,
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
     total:{
         type: String,         
     },
     companyId:{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Company'
     }
}, {
    timestamps: true
})

feedSchema.pre('save', async function(next){
    const feed = this

    feed.total = feed.price * feed.quantity

    next()
})

const Feed = mongoose.model('Feed', feedSchema)
module.exports = Feed
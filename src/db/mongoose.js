const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fyp-record', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
    
})
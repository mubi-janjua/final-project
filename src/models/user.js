const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validate = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    email: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       lowercase: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    cell: {
        type: String
    },
    tokens : [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
}, 
{
    timestamps: true
})

userSchema.virtual('customers', {
    ref: 'Customer',
    localField: '_id',
    foreignField: 'owner' 
})

//user token
userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString() }, 'thisismyne')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//credentials for login
userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({email})
   if(!user){
       throw new Error('unable to login')
   }

   const isMatch = await bcrypt.compare(password, user.password)

   if(!isMatch){
       throw new Error('unable to login')
   }

   return user
}

//hash password
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
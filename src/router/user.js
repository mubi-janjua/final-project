const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async(req,res)=>{

    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }

})

router.post('/users/login', async(req,res)=>{
    try{
       const user = await User.findByCredentials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()
       res.status(201).send({user, token})
    } catch (e) {
       res.status(400).send(e)
      
    }

})

router.post('/users/logout',auth, async(req, res)=>{

    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return  token.token !== req.token
        })
        await req.user.save()

        res.send('logout')
    } catch(e){
          res.status(500).send()
    }

})

router.get('/users/me', auth,  async(req,res)=>{
    res.send(req.user)
})


// router.get('/users/all', auth,  async(req,res)=>{
//     try{
//         const users = await User.find({})
//         res.status(200).send(users)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.get('/users/:id', async(req,res)=>{
    const _id = req.params.id
    // console.log(_id)
    try{
        const user = await User.findById(_id)
        if(!user){
            res.status(404).send()
        }

        res.status(201).send(user)
    } catch (e) {
           res.status(400).send(e)
    }
})

router.patch('/users/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'password', 'cell']
    const isValidationOperation = updates.every((update)=> allowedUpdate.includes(update))

    if(!isValidationOperation){
        return res.status(401).send({error: 'Invalid Update'})
    }

    try{
        //  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
         const user = await User.findByIdAndUpdate(req.params.id)
         updates.forEach((update)=>user[update] = req.body[update])

         await user.save()
         if(!user){
             res.status(404).send()
         }

         res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
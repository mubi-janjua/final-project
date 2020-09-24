const express = require('express')
const Feed = require('../models/feedpurchase')

const router = new express.Router()

router.post('/feeds/new', async(req, res)=>{
    const feed =  new Feed(req.body)
    try{
        await feed.save()
        res.status(200).send(feed)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/feeds/all', async(req,res)=>{
    try{
        const feed = await Feed.find({})
        res.status(320).send(feed)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/feeds/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        const feed = await Feed.findById(_id)
        if(!feed){
            res.status(404).send()
        }
        res.status(302).send(feed)
    } catch(e){
        res.status(400).send(e)
    }
})

router.patch('/feeds/update/:id', async(req,res)=>{
   const updates = Object.keys(req.body)
   const allowedUpdate = ['price', 'quantity', 'companyId', 'total']
   const isValidationOperation = updates.every((update)=> allowedUpdate.includes(update))
   
   if(!isValidationOperation){
       res.status(404).send('Invalid Update')
   }

   try{
    const feed = await Feed.findByIdAndUpdate(req.params.id)
    updates.forEach((update)=>feed[update]= req.body[update])

    await feed.save()
    res.status(200).send(feed)
    } catch(e){
      res.status(400).send(e)
    }
})

router.delete('/feeds/:id', async(req,res)=>{
   try{
       const feed = await Feed.findByIdAndDelete(req.params.id)
       res.status(200).send(feed)
   }catch(e) {
       res.status(400).send(e)
   }
})



module.exports = router
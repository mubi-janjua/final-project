const express = require('express')
const Purchase = require('../models/purchase')

const router = new express.Router()

router.post('/purchases/new', async(req,res)=>{
    const purchase = new Purchase(req.body)
    try{
        await purchase.save()
        res.status(201).send(purchase)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/purchases/all', async(req, res)=>{
    try{
        const purchase = await Purchase.find({})
        res.status(302).send(purchase)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/purchases/:id', async(req, res)=>{
    const _id = req.params.id
    try{
        const purchase = await Purchase.findById(_id)
        if(!purchase){
            res.status(404).send()
        }

        res.status(302).send(purchase)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/purchases/update/:id', async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['dated', 'loryno', 'chickenweight', 'rateperkg', 'rateper', 'total']
    const isValidationOperation = updates.every((update)=> allowedUpdate.includes(update))
    
    if(!isValidationOperation){
        res.status(401).send('Invalid Update')
    }

    try{
        const purchase = await Purchase.findByIdAndUpdate(req.params.id)
        updates.forEach((update)=> purchase[update] = req.body[update])

        await purchase.save()
        res.status(200).send(purchase)
    } catch(e){
        res.status(400).send(e)
        console.log(e)
        
    }
})

router.delete('/purchases/:id', async(req,res)=>{
    try{
        const purchase = await Purchase.findByIdAndDelete(req.params.id)
        res.status(302).send(purchase)
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router
const express = require('express')
const Sale = require('../models/sale')

const router = new express.Router()

router.post('/sales/new', async(req,res)=>{
    const sale = new Sale(req.body)
    try{
        await sale.save()
        res.status(201).send(sale)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/sales/all', async(req, res)=>{
    try{
        const sale = await Sale.find({})
        res.status(302).send(sale)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/sales/:id', async(req, res)=>{
    const _id = req.params.id
    try{
        const sale = await Sale.findById(_id)
        if(!sale){
            res.status(404).send()
        }

        res.status(302).send(sale)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/sales/update/:id', async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['dated', 'billno', 'loryno', 'chickenquantity', 'rateper', 'price']
    const isValidationOperation = updates.every((update)=> allowedUpdate.includes(update))
    
    if(!isValidationOperation){
        res.status(401).send('Invalid Update')
    }

    try{
        const sale = await Sale.findByIdAndUpdate(req.params.id)
        updates.forEach((update)=> sale[update] = req.body[update])

        await sale.save()
        res.status(200).send(sale)
    } catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

router.delete('/sales/:id', async(req,res)=>{
    try{
        const sale = await Sale.findByIdAndDelete(req.params.id)
        res.status(302).send(sale)
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router
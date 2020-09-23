const express = require('express')
const Customer = require('../models/customer')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/customers/new', auth, async(req, res)=> {
    // const customer = new Customer(req.body)
       const customer = new Customer({
           ...req.body,
           owner: req.user._id
       })
    try{
        await customer.save()
        res.status(201).send(customer)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/customers', auth, async(req, res)=>{
    try{
        await req.user.populate('customers').execPopulate()
        res.status(302).send(req.user.customers)
    } catch (e){
        res.status(400).send(e)
    }

})

router.get('/customers/:id', auth, async(req, res)=> {
    const _id = req.params.id
    try{
        //  const customer = await Customer.findById(_id)
        const customer = await Customer.findOne({_id, owner: req.user._id})
        if(!customer){
            res.status(400).send()
        }
         res.status(302).send(customer)      
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/customers/:id', auth, async(req, res)=>{
    const updates =  Object.keys(req.body)
    const allowedUpdate = ['name', 'cell', 'address', 'shopname']
    const isValidationOperation = updates.every((update)=> allowedUpdate.includes(update))

    if(!isValidationOperation){
        res.status(400).send('Invalid Update')
    }
     
    try{
        const customer = await Customer.findOne({_id: req.params.id, owner: req.user.id})
        // const customer = await Customer.findByIdAndUpdate(req.params.id)

        if(!customer){
            res.status(404).send()
        }

        updates.forEach((update)=> customer[update] = req.body[update])
        await customer.save()
        res.status(200).send(customer)

    } catch (e) {
        res.status(404).send(e)
    }

})
router.delete('/customers/:id', auth, async(req,res)=>{
    try{
        const customer = await Customer.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        if(!customer){
            res.status(400).send()
        }
        res.status(200).send(customer)
    } catch (e) {
        res.status(404).send(e)
    }
})
module.exports = router
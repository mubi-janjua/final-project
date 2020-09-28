const express = require('express')
const Medicine = require('../models/medicine')

const router = express.Router()

router.post('/medicines/new', async(req,res)=>{
    try{
        const medicine = new Medicine(req.body)
        await medicine.save()
        res.status(200).send(medicine)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/medicines/all', async (req, res)=>{
    try{
        const medicine = await Medicine.find({})
        res.status(302).send(medicine)
    } catch(e){
        res.status(400).send(e)
    }
})
router.get('/medicines/:id', async (req,res)=>{
   const _id = req.params.id
    try{
       const medicine = await Medicine.findById(_id)
        if(!medicine){
            res.status(404).send()
        }
        res.status(302).send(medicine)
    } catch(e){
       res.status(400).send(e)
    }
})
router.patch('/medicines/update/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['medicinename', 'rate', 'quantity', 'total', 'shopname',]
    const isValidationOperation = updates.every((update)=>allowedUpdate.includes(update))

    if(!isValidationOperation){
        res.status(404).send('Invalid Update')
    }
    try{
        const medicine = await Medicine.findByIdAndUpdate(req.params.id)
        updates.forEach((update)=> medicine[update] = req.body[update])

        await medicine.save()
        res.status(302).send(medicine)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/medicines/:id', async (req,res)=>{
    try{
        const medicine = await Medicine.findByIdAndDelete(req.params.id)
        res.status(200).send(medicine)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router
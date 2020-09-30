const express = require('express')
const Expense = require('../models/expense')

const router = express.Router()

router.post('/expenses/new', async(req, res)=>{
    try{
    const expense = new Expense(req.body)
    await expense.save()
    res.status(201).send(expense)
    } catch (e) {
      res.status(400).send(e)
    }
})

router.get('/expenses/all', async(req,res)=>{
    try{
        const expense = await Expense.find({})

        res.status(302).send(expense)
    } catch(e) {
        res.send(400).send(e)
    }
})

router.get('/expenses/:id', async(req, res)=>{
    const _id = req.params.id
    try{
        const expense = await Expense.findById(_id)
        if(!expense){
            res.status(404).send()
        }

        res.status(302).send(expense)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/expenses/update/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['expensename', 'total', 'remark']
    const isValidationOperation = updates.every((update)=> allowedUpdate.includes(update))

    if(!isValidationOperation){
        res.status(401).send('Invalid Update')
    }
    
    try{
        const expense = await Expense.findByIdAndUpdate(req.params.id)
        updates.forEach((update)=> expense[update] = req.body[update])

        await expense.save()
        res.status(200).send(expense)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/expenses/:id', async(req, res)=>{
    try{
        const expense = await Expense.findByIdAndDelete(req.params.id)
        res.status(200).send(expense)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router
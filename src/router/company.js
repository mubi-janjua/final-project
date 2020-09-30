const express = require('express')
const Company = require('../models/company')
const auth = require('../middleware/auth')
const Customer = require('../models/customer')

const router = new express.Router()

router.post('/companys/registration', auth, async(req, res)=> {

       const company = new Company({
           ...req.body,
           admin: req.user._id
       })

    try{
        await company.save()
        res.status(201).send(company)
    } catch (e) {
        res.status(400).send(e)
        
    }
})

router.get('/companys', auth, async(req, res)=>{
    try{

        await req.user.populate('Companys').execPopulate()
        res.send(req.user.Companys)
    } catch (e) {
        res.send(400).send(e)
    }
})

router.get('/companys/:id', auth, async(req, res)=> {
    const _id = req.params.id
    try{
        const company = await Company.findOne({_id, admin: req.user._id})
        if(!company){
            res.status(404).send()
        }
         res.status(302).send(company)      
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/companys/update/:id', auth, async(req, res)=>{
  const updates = Object.keys(req.body)
  const allowedUpdate = ['companyname', 'address', 'city', 'state', 'country', 'cell']
  const isValidationOperation = updates.every((update)=> allowedUpdate.includes(update))

  if(!isValidationOperation){
      res.status(401).send('Invalid Update')
  }
   
  try{
      const company = await Company.findOne({_id: req.params.id, admin: req.user.id})

      if(!company){
          res.send(404).send()
      }
      updates.forEach((update)=> company[update] = req.body[update])
      await company.save()
      res.status(200).send(company)
  } catch (e) {
      res.status(400).send(e)
  }

})

router.delete('/companys/:id', auth, async(req, res)=>{
   
    try{
        const company = await Company.findOneAndDelete({_id: req.params.id, admin: req.user.id})
        if(!company){
            res.status(404).send()
        }
        res.status(200).send(company)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
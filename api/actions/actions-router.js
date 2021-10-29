// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const {
 validateActionId,
 validateAction,
 validateUpdatedAction   
} = require('./actions-middlware')

const Actions =  require('./actions-model');

router.get('/', async (req, res, next) => {
    try{
        const action = await Actions.get()
        res.status(200).json(action)
    }catch(err){
        next(err)
    }
})

router.get('/:id', validateActionId, async (req, res, next)=>{
    try{
        const action = await Actions.get(req.params.id)
        res.status(200).json(action)
    }catch(err){
        next(err)
    }
})

router.post('/', validateAction, async (req, res, next) => {
    try{
        const action = await Actions.insert(req.body)
        res.status(201).json(action)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateActionId, validateUpdatedAction, async (req, res, next) => {
    try{
        const { id } = req.params
        const updatedAction = await Actions.update(id, req.body)
        res.status(200).json(updatedAction)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try{
        const { id } = req.params
        const removedAction = await Actions.remove(id)
        res.status(200).json(removedAction)
    }catch(err){
        next(err)
    }
}) 

module.exports = router
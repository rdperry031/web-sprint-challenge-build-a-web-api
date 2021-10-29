// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const {
 validateActionId   
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

module.exports = router
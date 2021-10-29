// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActionId(req, res, next){
    try{
        const action = await Actions.get(req.params.id)
        if(!action){
            next({status: 404, message: `Action with id ${req.params.id} does not exist`})
        }else{
            next()
        }

    }catch(err){
        res.status(500).json({ message: 'problem finding action'})
    }
}

module.exports = {
    validateActionId,
}
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

async function validateAction(req, res, next){
    try{
        const { notes, description, project_id, completed} = req.body
        if(!notes || !description || !project_id ){
            next({ status: 400, message: 'Name and description are required'})
        }else{
            next()
        }
    }catch(error){
        res.status(500).json({ message: 'problem adding new project to database'})
    }
}

async function validateUpdatedAction(req, res, next){
    try{
        const {notes, description, project_id, completed} = req.body
        if(!notes || !description || !project_id){
            next({ status: 400, message: 'notes, description, project id, and completed are required' })
        }else{
            next()
        }
    }catch(error){
        res.status(500).json({ message: 'problem updating action'})
    }
}

module.exports = {
    validateActionId,
    validateAction,
    validateUpdatedAction
} 
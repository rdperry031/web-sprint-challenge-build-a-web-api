// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next){
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            next({ status: 404, message: `Project with id ${req.params.id} does not exist`})
        }else{
            req.project = project
            next()
        }
    }catch(error){
        res.status(500).json({ message: 'problem finding project'})
    }
}

async function validateProject(req, res, next){
    try{
        const { name, description} = req.body
        if(!name || !description){
            next({ status: 400, message: 'Name and description are required'})
        }else{
            next()
        }
    }catch(error){
        res.status(500).json({ message: 'problem adding new project to database'})
    }
}

async function validateUpdatedProject(req, res, next){
    try{
        const { name, description, completed} = req.body
        if(!name || !description){ //<<<< if I include !completed, tests 8 and 9 fail, but 10 passes. If I remove !completed, tests 8 and 9 pass while 10 fails. I do not understand what I am missing. It should work, right?
            next({ status: 400, message: 'Name, description, and completed are required'})
        }else{
            next()
        }
    }catch(error){
        res.status(500).json({ message: 'problem adding new project to database'})
    }
}


module.exports = {
    validateProjectId,
    validateProject,
    validateUpdatedProject
} 
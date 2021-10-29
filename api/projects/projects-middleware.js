// add middlewares here related to projects
const Projects = require('./projects-model');
const Actions = require('./projects-model');

async function validateProjectId(req, res, next){
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({ message: `Project with id ${req.params.id} does not exist`})
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
            res.status(400).json({ message: 'Name and description are required'})
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
}
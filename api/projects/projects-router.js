// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
const { 
    validateProject,
    validateProjectId,
    validateUpdatedProject,
 } = require('./projects-middleware')

router.get('/', async (req, res, next) => {
try{
    const projects = await Projects.get()
    res.status(200).json(projects)
}catch(err){
    next(err)
}
})

router.get('/:id', validateProjectId, async (req, res, next) => {
    try{
        res.status(200).json(req.project)
    }catch(err){
        next(err)
    }
})

router.post('/', validateProject, async (req, res, next) => {
    try{
       const project = await Projects.insert(req.body)
        res.status(201).json(project)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateProject, validateProjectId, async (req, res, next) =>{
    try{
        const { id } = req.params
        const project = await Projects.update(id, req.body)
        res.status(200).json(project)
    }catch(err){
        next(err)
    }
}) 

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        const { id } = req.params
        const deletedProject = await Projects.remove(id)
        res.status(200).json(deletedProject)
    }catch(err){
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async(req, res, next) => {
    try{
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    }catch(err){
        next(err)
    }
})
module.exports = router

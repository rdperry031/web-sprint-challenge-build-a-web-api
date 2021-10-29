// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');
const { 
    validateProject,
    validateProjectId,
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
        res.status(200).json(project)
    }catch(err){
        next(err)
    }
})

module.exports = router
 
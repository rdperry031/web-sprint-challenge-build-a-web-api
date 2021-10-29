// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');
const { validateProjectId } = require('./projects-middleware')

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

module.exports = router
 
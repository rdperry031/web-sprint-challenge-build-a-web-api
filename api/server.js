const express = require('express');
const server = express();


server.use(express.json());
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const projectsRouter = require('../api/projects/projects-router');
const actionsRouter = require('../api/actions/actions-router');

server.use('/api/projects',handleError, projectsRouter);

server.use('/api/actions',handleError, actionsRouter);


module.exports = server;

function handleError(err, req, res, next){
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: 'Internal server error'
    })
}


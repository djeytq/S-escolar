const routes = require('express').Router();
const session = require('./session');
const alunos = require('./alunos.js');
const middleware=require('../middleware/auth.js');


routes.use('/session', session);
routes.use('/alunos', middleware, alunos);

module.exports = routes;
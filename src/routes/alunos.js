const routes = require('express').Router();
const CrudAlunos = require('../controllers/crudAlunos.js');
const alunos=new CrudAlunos();


routes.get('/create', alunos.createAluno);
routes.get('/read', alunos.readAluno);
routes.get('/update', alunos.updateAluno);
routes.get('/delete', alunos.deleteAluno);

module.exports = routes;
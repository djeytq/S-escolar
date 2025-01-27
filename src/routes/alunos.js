const routes = require('express').Router();
const CrudAlunos = require('../controllers/crudAlunos.js');
const alunos = new CrudAlunos();
// const multer = require('multer');
const {storage, upload} = require('../middleware/multer.js');

routes.get('/create', upload.single('file'), alunos.createAluno);
routes.get('/read', alunos.readAluno);
routes.get('/update', alunos.updateAluno);
routes.get('/delete', alunos.deleteAluno);

module.exports = routes;
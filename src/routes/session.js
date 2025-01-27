const routes = require('express').Router();
const CrudSession = require('../controllers/crudSession.js');
const session=new CrudSession();


routes.get('/signup',session.SignUp);
routes.get('/signin',session.SignIn);

module.exports = routes;
const express = require('express');
const app=express();
const routes = require('./routes');
const Migration = require('./migration');
const cors = require('cors');
Migration();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.json({ message: 'Hello! Welcome to my api, it has many routes to you enjoy in your frontEnd.' });
});

app.use(routes);

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});
const express = require('express');
const app=express();
const routes = require('./routes');
const Migration = require('./migration');
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();
Migration();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.json({ message: 'Hello! Welcome to my api, it has many routes to you enjoy in your frontEnd.' });
});

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is running on port '+PORT);
});
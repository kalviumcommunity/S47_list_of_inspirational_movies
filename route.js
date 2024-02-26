
const express = require('express');
const app = express();
const data = require('./Data.json');

app.use(express.json());


const getting = app.get('/getting', (req, res) => {
    res.send(data);
});

const posting = app.post('/posting', (req, res) => {
    const newData = req.body;
    // console.log(req.body);
    data.push(newData);
    res.status(201).json(newData);
});


   
    // const putting = 


module.exports = { posting, getting};
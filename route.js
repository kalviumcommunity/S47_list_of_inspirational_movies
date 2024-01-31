
const express = require('express');
const app = express();
const data = require('./Data.json');

app.use(express.json());


const getting = app.get('/getting', (req, res) => {
    res.send(data);
});

const posting = app.post('/posting', (req, res) => {
    const newData = req.body;
    console.log(req.body);
    data.push(newData);
    res.status(201).json(newData);
});

const deletee = app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
        data.splice(id, 1);
        res.json(data);
    });
   
    const putting = app.put('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const update= req.body
        data[id] = update
            res.json(data);
        });


module.exports = { posting, getting, deletee,putting};
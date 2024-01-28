const express = require('express');
const mongoose = require('mongoose');
const config = {
	mongoURI:
		'mongodb+srv://akshitp:E7lFFxThDg8fe7Dd@cluster0.6uq2j9y.mongodb.net/?retryWrites=true&w=majority'
}

const app = express();

app.get('/ping', (req, res) => {
    mongoose.connect(config.mongoURI)
    .then(()=> {
        res.send("Connection is done.")
    })
    .catch(() => {
        res.send("Not connected")
    })
})

app.listen(3000, ()=> {
    console.log('nodi api is running in the 3000 port')
});

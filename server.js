const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');
const cors = require('cors');
const arr = require("./Data.json");
const app = express();
app.use(cors());
const { posting, getting, deletee,putting} = require('./route');
const config = {
	mongoURI:
		'mongodb+srv://akshitp:E7lFFxThDg8fe7Dd@cluster0.6uq2j9y.mongodb.net/?retryWrites=true&w=majority'
}


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


app.use(express.json());
app.get('/getting', getting);
app.post('/posting', posting);
app.delete('/:id', deletee);
app.put('/:id', putting);

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

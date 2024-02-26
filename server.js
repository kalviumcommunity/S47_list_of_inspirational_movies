const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');
const cors = require('cors');
const data = require('./Data.json');
const app = express();
app.use(express.json());

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

app.get('/getting', getting);
app.post('/posting', posting);

app.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const updatedata= req.body
    console.log(updatedata);
    const selectid = data.find((data) => data.ID === id);
    if (selectid) {
        selectid.MOVIE_NAME = updatedata.MOVIE_NAME || selectid.MOVIE_NAME;
        selectid.IMDb_RATINGS = updatedata.IMDb_RATINGS || selectid.IMDb_RATINGS;
        selectid.ROTTEN_TOMATOES_RATING = updatedata.ROTTEN_TOMATOES_RATING || selectid.ROTTEN_TOMATOES_RATING;
        selectid.RELEASE_DATE = updatedata.RELEASE_DATE || selectid.RELEASE_DATE;
        selectid.OFFICIAL_LANGUAGE = updatedata.OFFICIAL_LANGUAGE || selectid.OFFICIAL_LANGUAGE;
        selectid.AWARD_WON = updatedata.AWARD_WON || selectid.AWARD_WON;
        return res.json({
            data:updatedata
        }) 
    }
    res.status(404).send('Data not found');
    });

    app.delete('/delete/:id', (req, res) => {
        const id = parseInt(req.params.id);
    
        // Find the index of the item with the given ID
        const index = data.findIndex(item => item.ID === id);
    
        if (index !== -1) {
            // Remove the item at the found index
            const deletedItem = data.splice(index, 1);
            console.log(deletedItem);
    
            // Send back the deleted item
            return res.json(deletedItem);
        }
    
        // If item with given ID is not found, send 404 status
        res.status(404).send('Data not found');
    });
    

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(3000, ()=> {
    console.log('nodi api is running in the 3000 port')
});

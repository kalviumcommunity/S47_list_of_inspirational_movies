const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./movieSchema');
const app = express();
app.use(express.json());
app.use(cors());

const config = {
    mongoURI: 'mongodb+srv://akshitp:E7lFFxThDg8fe7Dd@cluster0.6uq2j9y.mongodb.net/firstASAP?retryWrites=true&w=majority'
}

mongoose.connect(config.mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Get all movies
        app.get('/movies', async (req, res) => {
            try {
                const movies = await Movie.find({});
                res.json(movies);
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Update a movie by ID
        app.put('/movies/update/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const updatedMovie = await Movie.findOneAndUpdate({ ID: id }, req.body, { new: true });
                res.json(updatedMovie);
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Delete a movie by ID
        app.delete('/movies/delete/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const deletedMovie = await Movie.findOneAndDelete({ ID: id });
                res.json(deletedMovie);
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Start the server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch(err => console.error(err));

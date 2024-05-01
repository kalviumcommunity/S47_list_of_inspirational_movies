const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./movieSchema');
const User = require('./userSchema');
const Joi = require('joi');
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


    // POST route to create a new user
    app.post('/users', async (req, res) => {
        const schema = Joi.object({
          name: Joi.string().min(3).max(30).required().label('Userame'),
          email: Joi.string().email().required().label('Email'),
        }).options({abortEarly: false});
  
        const userData = req.body; // Get user data from the request body
        console.log('request body:  ',userData)
        const { error, value } = schema.validate(userData);
        if (error) {
          console.log(error)
          res.status(400).json({ error });
        }
        else {
          try {
            console.log("validated value:  ",value)
            const createdUser = await User.create(value); // Create a new user
            console.log('user created:  ',createdUser)
            res.status(201).json(createdUser); // Respond with the created user
          } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message }); // Respond with an error message
          }
        }
      });

        // Start the server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch(err => console.error(err));

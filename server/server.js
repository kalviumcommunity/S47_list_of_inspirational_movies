const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./movieSchema');
const User = require('./userSchema');
const Joi = require('joi');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

const SECRET_KEY = 'your_secret_key'; 

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};


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
        app.put('/movies/update/:id', authenticateToken, async (req, res) => { 
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
  
        const userData = req.body; 
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

            res.status(201).json(createdUser); 
          } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message }); 
          }
        }
      });


           // POST route to login
           app.post('/login', async (req, res) => {
            const schema = Joi.object({
              name: Joi.string().min(3).max(30).required().label('Username'),
              email: Joi.string().email().required().label('Email'),
            }).options({ abortEarly: false });
          
            const userData = req.body;
          
            const { error, value } = schema.validate(userData);
          
            if (error) {
              res.status(400).json({ message: 'Validation failed', errors: error.details });
              return;
            }
          
            const { name, email} = value;
          
            try {
              const findUser = await User.findOne({ name, email });
              if (!findUser) {
                res.status(404).json({ message: 'user not found' });
                return;
              }
              const token = jwt.sign({ userId: findUser._id, email: findUser.email }, SECRET_KEY ,{expiresIn: '1h'});
              console.log(token)
              res.cookie('token', token, { httpOnly: false, maxAge: 36000000, sameSite: 'none', secure: true,path: '/' }); // 1 hour expiration time
              res.cookie('username', name,{httpOnly: true});
              res.status(200).json({message: 'user found and logged in'});
            } catch (err) {
              res.status(500).json({ message: 'Error', error: err.message });
            }
          });
  
  
      app.get('/logout', (req, res) => {
        res.clearCookie('username');
        res.clearCookie('token');
        res.status(200).send({ message: 'Logged out successfully' });
      }); 




        // Start the server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch(err => console.error(err));

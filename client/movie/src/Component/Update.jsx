// Update.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Update() {
    // const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state.data);

    const [formData, setFormData] = useState({
        ID: location.state?.data.ID,
        MOVIE_NAME: location.state?.data.MOVIE_NAME,
        IMDb_RATINGS: location.state?.data.IMDb_RATINGS.toString(),
        ROTTEN_TOMATOES_RATING: location.state?.data.ROTTEN_TOMATOES_RATING,
        RELEASE_DATE: location.state?.data.RELEASE_DATE,
        OFFICIAL_LANGUAGE: location.state?.data.OFFICIAL_LANGUAGE,
        AWARD_WON: location.state?.data.AWARD_WON
    });
    console.log(formData);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = {
            ...formData,
            IMDb_RATINGS: parseFloat(formData.IMDb_RATINGS)
        };
        console.log(updatedMovie);

        axios.put(`http://localhost:3000/update/${formData.ID}`, updatedMovie)
            .then(response => {
                console.log('Movie updated successfully:', response.data);
                navigate('/'); // Navigate to the movies page after successful update
            })
            .catch(error => {
                console.error('Error updating movie:', error);
            });
    };


    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>ID: {formData.ID}</h3>
                    <label htmlFor="movieName">Movie Name:</label>
                    <input
                        type="text"
                        id="movieName"
                        name="MOVIE_NAME"
                        value={formData.MOVIE_NAME}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="imdbRatings">IMDb Ratings:</label>
                    <input
                        type="number"
                        id="imdbRatings"
                        name="IMDb_RATINGS"
                        value={formData.IMDb_RATINGS}
                        onChange={handleChange}
                        step="0.1"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rottenTomatoesRating">Rotten Tomatoes Rating:</label>
                    <input
                        type="text"
                        id="rottenTomatoesRating"
                        name="ROTTEN_TOMATOES_RATING"
                        value={formData.ROTTEN_TOMATOES_RATING}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input
                        type="text"
                        id="releaseDate"
                        name="RELEASE_DATE"
                        value={formData.RELEASE_DATE}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="officialLanguage">Official Language:</label>
                    <input
                        type="text"
                        id="officialLanguage"
                        name="OFFICIAL_LANGUAGE"
                        value={formData.OFFICIAL_LANGUAGE}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="awardWon">Award Won:</label>
                    <input
                        type="text"
                        id="awardWon"
                        name="AWARD_WON"
                        value={formData.AWARD_WON}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Movie</button>
            </form>
        </div>
    );
}

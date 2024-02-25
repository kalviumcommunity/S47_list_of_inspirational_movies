import React, { useState } from 'react';

function AddMovieForm({ OnAddMovie }) {
    const [formData, setFormData] = useState({
        MOVIE_NAME: '',
        IMDb_RATINGS: '',
        ROTTEN_TOMATOES_RATING: '',
        RELEASE_DATE: '',
        OFFICIAL_LANGUAGE: '',
        AWARD_WON: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMovie = {
            ...formData,
            IMDb_RATINGS: parseFloat(formData.IMDb_RATINGS)
        };

        try {
            const response = await fetch("http://localhost:3000/posting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMovie)
            });

            if (!response.ok) {
                throw new Error('Failed to add movie');
            }

            OnAddMovie(newMovie); // Call the parent component function if successful
            setFormData({
                MOVIE_NAME: '',
                IMDb_RATINGS: '',
                ROTTEN_TOMATOES_RATING: '',
                RELEASE_DATE: '',
                OFFICIAL_LANGUAGE: '',
                AWARD_WON: ''
            });
        } catch (error) {
            console.error('Error adding movie:', error);
            // Handle error as needed
        }
    };

    return (
        <div className="add-movie-form">
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="imdbRatings">IMDb Ratings:</label>
                    <input
                        type="number"
                        id="imdbRatings"
                        name="IMDb_RATINGS"
                        value={formData.IMDb_RATINGS}
                        onChange={handleChange}
                        min="0"
                        max="10"
                        step="0.1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rottenTomatoesRating">Rotten Tomatoes Rating:</label>
                    <input
                        type="text"
                        id="rottenTomatoesRating"
                        name="ROTTEN_TOMATOES_RATING"
                        value={formData.ROTTEN_TOMATOES_RATING}
                        onChange={handleChange}
                        pattern="\d{1,3}%"
                        title="Enter percentage rating (e.g., 67%)"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input
                        type="date"
                        id="releaseDate"
                        name="RELEASE_DATE"
                        value={formData.RELEASE_DATE}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
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

                <div className="form-group">
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

                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovieForm;

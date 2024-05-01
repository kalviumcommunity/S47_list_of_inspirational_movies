import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Movies.css'; // Importing CSS file

export default function Movies() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        ID: '',
        MOVIE_NAME: '',
        IMDb_RATINGS: '',
        ROTTEN_TOMATOES_RATING: '',
        RELEASE_DATE: '',
        OFFICIAL_LANGUAGE: '',
        AWARD_WON: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const handleUpdateClick = (data) => {
        navigate(`/update`, {state: {data}});
    };
    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:3000/movies/delete/${id}`).then(() => {
            setUsers(users.filter((user) => user.ID !== id));
        })
    }

    return (
        <div className="movies-container"> {/* Applied class name to the container */}
            {users.map((data) => (
                <div key={data.ID} className="movie-card"> {/* Applied class name to each movie card */}
                    <h3 className="movie-name">{data.MOVIE_NAME}</h3> {/* Applied class name */}
                    <hr className="divider" />
                    <p className="movie-info">IMDb Ratings: {data.IMDb_RATINGS}</p> {/* Applied class name */}
                    <p className="movie-info">Rotten Tomatoes Rating: {data.ROTTEN_TOMATOES_RATING}</p> {/* Applied class name */}
                    <p className="movie-info">Release Date: {data.RELEASE_DATE}</p> {/* Applied class name */}
                    <p className="movie-info">Official Language: {data.OFFICIAL_LANGUAGE}</p> {/* Applied class name */}
                    <p className="movie-info">Award Won: {data.AWARD_WON}</p> {/* Applied class name */}
                    <button className="update-btn" onClick={() => handleUpdateClick(data)}>Update</button> {/* Applied class name */}
                    <button className="delete-btn" onClick={() => handleDeleteClick(data.ID)}>Delete</button> {/* Applied class name */}
                </div>
            ))}
        </div>
    );
}

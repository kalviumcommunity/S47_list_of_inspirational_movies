import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Movies.css'; 

export default function Movies() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('all');
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


    const filterUsers = () => {
        if (selectedUser === 'all') {
            return users;
        } else {
            return users.filter(user => user.CREATED_BY === selectedUser);
        }
    };

    return (
        <div className="movies-container"> 
            <div className="dropdown">
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                    <option value="user3">User 3</option>
                </select>
            </div>
            {filterUsers().map((data) => (
                <div key={data.ID} className="movie-card">
                    <h3 className="movie-name">{data.MOVIE_NAME}</h3> 
                    <hr className="divider" />
                    <p className="movie-info">IMDb Ratings: {data.IMDb_RATINGS}</p>
                    <p className="movie-info">Rotten Tomatoes Rating: {data.ROTTEN_TOMATOES_RATING}</p>
                    <p className="movie-info">Release Date: {data.RELEASE_DATE}</p> 
                    <p className="movie-info">Official Language: {data.OFFICIAL_LANGUAGE}</p> 
                    <p className="movie-info">Award Won: {data.AWARD_WON}</p> 
                    <p className="movie-info">Created By: {data.CREATED_BY}</p>
                    <button className="update-btn" onClick={() => handleUpdateClick(data)}>Update</button> 
                    <button className="delete-btn" onClick={() => handleDeleteClick(data.ID)}>Delete</button> 
                </div>
            ))}
        </div>
    );
}

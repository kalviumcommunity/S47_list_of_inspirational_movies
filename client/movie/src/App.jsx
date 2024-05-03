import React from 'react';
import { Form, Link, Route, Routes } from 'react-router-dom';
import Movies from './Component/Movies';
import Add from './Component/Add';
import Update from './Component/Update';
import Login from './Component/Login';

function App() {
    return (
        <>
            <div>INSPIRATIONAL-MOVIES</div>
            <br />
            <Link to="/">Home</Link><br /> <hr />
            <Link to="/add">Add</Link> <br />  <hr />
            <Link to="/login"> <b>Login</b> </Link>
            <br /> <br />
            <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/update" element={<Update />} />
                <Route path="/" element={<Movies />} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </>
    );
}

export default App;

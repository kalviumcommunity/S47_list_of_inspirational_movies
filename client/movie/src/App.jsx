// import { Link, Route, Router, Routes } from 'react-router-dom'
// import './App.css'
// // import Data from '../Data.json'
// import Movies from './Component/Movies'
// import Add from './Component/Add'
// import Update from './Component/Update'



// function App() {

//   return (
//     <>

// <div>INSPIRATIONAL-MOVIES</div>
//    <br />
    
//     <Link to="/">Home</Link><br /> <hr />
//     <Link to="/add">Add</Link>
    
//     <br /> <br />
//     <Routes>    
//                 <Route path="/add" element={<Add />} />

//                 <Route path="/update/:id" element={<Update />} />

//                 <Route path="/" element={<Movies />} />
//             </Routes>
  
//   {/* <div>
//     <h6>{Data[0].MOVIE_NAME}</h6>
//     <h6>{Data[0].IMDb_RATINGS}</h6>
//     <h6>{Data[0].ROTTEN_TOMATOES_RATING}</h6>
//     <h6>{Data[0].RELEASE_DATE}</h6>
//     <h6>{Data[0].OFFICIAL_LANGUAGE}</h6>
//     <h6>{Data[0].AWARD_WON}</h6>
//   </div> */}


//     </>
//   )
// }

// export default App

// App.jsx

import React from 'react';
// import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Movies from './Component/Movies';
import Add from './Component/Add';
import Update from './Component/Update';

function App() {
    return (
        <>
            <div>INSPIRATIONAL-MOVIES</div>
            <br />
            <Link to="/">Home</Link><br /> <hr />
            <Link to="/add">Add</Link>
            <br /> <br />
            <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/update" element={<Update />} />
                <Route path="/" element={<Movies />} />
            </Routes>
        </>
    );
}

export default App;

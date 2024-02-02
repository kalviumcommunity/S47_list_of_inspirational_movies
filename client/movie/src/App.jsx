import './App.css'
import Data from '../Data.json'

function App() {

  return (
    <>
  <div>INSPIRATIONAL-MOVIES</div>
  <div>
    <h1>{Data[0].MOVIE_NAME}</h1>
    <h1>{Data[0].IMDb_RATINGS}</h1>
    <h1>{Data[0].ROTTEN_TOMATOES_RATING}</h1>
    <h1>{Data[0].RELEASE_DATE}</h1>
    <h1>{Data[0].OFFICIAL_LANGUAGE}</h1>
    <h1>{Data[0].AWARD_WON}</h1>
  
  
  
  
  
  </div>

    </>
  )
}

export default App

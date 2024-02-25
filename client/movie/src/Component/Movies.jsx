import { useState } from 'react'
import { useEffect } from 'react'
import {BrowserRouter as Routes, Route, Link, Router } from 'react-router-dom'
import Add from './Add'

export default function Movies() {
        const [users, setUsers] = useState([])
        useEffect(()=>{
            fetch("http://localhost:3000/getting")
            .then((res) => res.json())
            .then((data) => setUsers(data))
        },[])
    return (
        <div>
               

            
            <div>
                <table>
                    <tbody>
                        {users.map((data) => {
                            return (
                                <>
                
                                    <tr key={data.ID}>
                                    <td>{data.MOVIE_NAME} <hr /> <br /> </td>
                                    
                                    <td>{data.IMDb_RATINGS}<hr /> <br /></td>
                                    <td>{data.ROTTEN_TOMATOES_RATING}<hr /> <br /></td>
                                    <td>{data.ELEASE_DATE}<hr /> <br /></td>
                                    <td>{data.OFFICIAL_LANGUAGE}<hr /> <br /></td>
                                    <td>{data.AWARD_WON}<hr /> <br /></td>
                                    <button>Update</button>
                                    <button>Delete</button>
                                </tr>

                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>


        </div>
    )
}
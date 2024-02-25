import { useState } from 'react'
import { useEffect } from 'react'

export default function BrowseStories() {
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
                                <tr key={data.ID}>
                                    <td>{data.MOVIE_NAME}</td>
                                    <td>{data.IMDb_RATINGS}</td>
                                    <td>{data.ROTTEN_TOMATOES_RATING}</td>
                                    <td>{data.ELEASE_DATE}</td>
                                    <td>{data.OFFICIAL_LANGUAGE}</td>
                                    <td>{data.AWARD_WON}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
import React, { useState, useEffect } from "react";
import axios from "axios";

function Match(){
    const [similarUsers, setSimilarUsers] = useState([]);

    const handleClick = async () => {
        const config = {
            headers: { 
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/match/`, config);
            setSimilarUsers(response.data.similar_users);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <button onClick={handleClick}>Match</button>
            {similarUsers.length > 0 && (
                <ul className='text-white'>
                    {similarUsers.map(user => (
                        <li key={user.id}>
                            {user.name} - Similitud: {Math.round(user.similarity * 100, 0)} %
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Match
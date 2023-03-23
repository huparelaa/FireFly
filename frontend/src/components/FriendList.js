import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FriendList() {
    const [amigos, setAmigos] = useState(null);
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };
    useEffect(() => {
        async function getFriends() {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_friends/`, config)
                .then(response => {
                    setAmigos(response.data.friends);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        getFriends()
    }, []);
    if (!amigos) {
        return <p>Cargando amigos...</p>;
    }
    return (
        <div className='text-white' style={{ position: 'absolute', top: '20px', right: '240px' }}>
          <h2>Mis amigos:</h2>
          {amigos.map(friend => (
            <li key={friend}>
              {friend}
            </li> 
          ))}
        </div>
      );        
}

export { FriendList }
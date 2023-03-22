import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FriendList() {
    const [amigos, setAmigos] = useState(null);
    useEffect(() => {
        axios.get('/api/get_friends/')
        .then(response => {
            setAmigos(response.data.amigos);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    if (!amigos) {
        return <p>Cargando amigos...</p>;
    }
    return (
        <div className='text-white' >
        <h2>Mis amigos:</h2>
        <ul > 
            <li>Hobar</li>
            <li>David Gonzalez</li>
            <li>Angel Martinez</li>
        </ul>
        </div>
    );
}

export { FriendList }
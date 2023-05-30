import React, { useState, useEffect } from "react";
import axios from "../../apiConnection";
import { Navigate } from "react-router-dom";


function AfterLogin(){
    const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const config = {
        headers: { 
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };
    useEffect(() => {
        async function fetchHasEntered() {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/has_entered_before/`, config)
                setHasLoggedInBefore(res.data.has_entered)
                console.log(res);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchHasEntered()
    });

    const handleUpdateHasEnteredBefore = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/user/has_entered_before_true/`, undefined, config);
            setHasLoggedInBefore(true);
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) {
        // Muestra un indicador de carga mientras la consulta está en curso
        return <div>Cargando...</div>
    }

    if (!hasLoggedInBefore) {
        handleUpdateHasEnteredBefore();
        console.log(hasLoggedInBefore);
        return <Navigate to="/games" /> 
    } else {
        return <Navigate to="/dashboard"/>
    }
}

export {AfterLogin}
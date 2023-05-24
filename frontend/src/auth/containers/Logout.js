import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserApi from '../actions/auth'
import Swal from 'sweetalert2'

function Logout(){
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { 
        res_logout()
        if (!isLoading) {
            Swal.fire({
                timer: 1000,
                timerProgressBar: true,
                icon: 'success',
                title: `Logout exitoso`,
                text: `Fue en un placer verte en FireFly, ¡Te esperamos de nuevo!`,
            })    
        } else {
            localStorage.setItem('access', '')
        }
    })
    
    const res_logout = async () => {
        try { 
            UserApi.logout()
        }
        catch (err){ 
            console.error('Logout malo');
        }
        finally {
            setIsLoading(false);
        }
    }
    if(isLoading){
        return <Navigate to="/" /> 
    }
}

export default Logout
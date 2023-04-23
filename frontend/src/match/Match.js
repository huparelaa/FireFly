import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SideBar } from "../components/SideBar";
import ReactStars from "react-rating-stars-component";

function Match() {
    const [similarUsers, setSimilarUsers] = useState([]);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [isDelay, setIsDelay] = useState(false);
    const [delaySeconds, setDelaySeconds] = useState(5);
    const [rating, setRating] = useState(0);
    const MySwal = withReactContent(Swal)
    const showReviewDialog = () => {
        MySwal.fire({
            title: 'Danos tu opinión aquí ',
            html:
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <ReactStars
                        size={50}
                        isHalf={true}
                        count={5}
                        value={rating}
                        onChange={(newRating) => setRating(newRating)}
                    />
                    <textarea className="swal2-textarea" placeholder="..." id="review"></textarea>
                </div>
            ,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            preConfirm: submitReview,
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        });
    };

    const submitReview = () => {
        const review = MySwal.getPopup().querySelector('#review').value
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        axios.post(`${process.env.REACT_APP_API_URL}/api/review/match/`, { rating, review }, config)
            .then(response => {
                Swal.fire({
                    title: 'Gracias!',
                    text: 'Su retroalimentacion se se envio de forma exitosa',
                    icon: 'success'
                });
                setRating(0);
            })
            .catch(error => {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Ocurrio un error al enviar la retroalimentacion',
                    icon: 'error'
                });
            });
    };

    const handleClick = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        try {
            setIsButtonPressed(true);
            setIsDelay(true);
            setDelaySeconds(5);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/match/`, config);
            setIsDelay(false);
            setSimilarUsers(response.data.similar_users);
        } catch (error) {
            setIsDelay(false);
            setIsButtonPressed(false);
            console.error(error);
            Swal.fire({
                timer: 3000,
                timerProgressBar: true,
                icon: 'error',
                title: `Ocurrio un error al buscar el match`,
            })
        }
    }

    const handleCancel = () => {
        setIsDelay(false);
        setIsButtonPressed(false);
        setDelaySeconds(5);
        setSimilarUsers([]);
        Swal.fire({
            icon: 'info',
            title: 'Match cancelado',
        });
    }

    useEffect(() => {
        let interval = null;
        if (isDelay) {
            interval = setInterval(() => {
                setDelaySeconds(delaySeconds => delaySeconds - 1);
            }, 1000);
        }
        if (delaySeconds === 0) {
            setIsDelay(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isDelay, delaySeconds]);

    return (
        <div className="flex" style={{ width: "100%", height: "100%" }}>
            <SideBar />
            <div className=" w-screen flex justify-center items-center">
                {!isButtonPressed && !isDelay && (
                    <div className="w-64 h-64 rounded-lg flex justify-center items-center ">
                        <p className=" text-white font-bold">
                            Oprime el boton para hacer el match
                        </p>
                        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Match
                        </button>
                    </div>
                )}
                {isDelay && (
                    <div className="w-64 h-64 rounded-lg flex justify-center items-center">
                        <p className="text-white font-bold">
                            Buscando los mejores compañeros de juego para ti. Tiempo: {delaySeconds} segundos...
                        </p>
                        <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancelar
                        </button>
                    </div>
                )}
                {isButtonPressed && similarUsers.length > 0 && (
                    <>
                        <ul className='text-white'>
                            {similarUsers.map(user => (
                                <li key={user.id}>
                                    {user.name} - Similitud: {Math.round(user.similarity * 100, 0)} %
                                </li>
                            ))}
                        </ul>
                        <div className="w-64 h-64 rounded-lg flex justify-center items-center ">
                            <button onClick={showReviewDialog} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Review del Match
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Match;
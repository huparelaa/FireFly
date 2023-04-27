import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SideBar } from "../components/SideBar";
import { Rating } from 'react-simple-star-rating'
import { MdOutlineSentimentDissatisfied,
        MdOutlineSentimentNeutral,
        MdOutlineSentimentSatisfied,
        MdOutlineSentimentVeryDissatisfied,
        MdOutlineSentimentVerySatisfied } from 'react-icons/md'
import defaultProfile from "../assets/defaultProfile.jpg"
import { Link } from "react-router-dom";

function Match() {
    const [similarUsers, setSimilarUsers] = useState([]);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [isDelay, setIsDelay] = useState(false);
    const [delaySeconds, setDelaySeconds] = useState(5);
    const customIcons = [
        { icon: <MdOutlineSentimentVeryDissatisfied size={50} /> },
        { icon: <MdOutlineSentimentDissatisfied size={50} /> },
        { icon: <MdOutlineSentimentNeutral size={50} /> },
        { icon: <MdOutlineSentimentSatisfied size={50} /> },
        { icon: <MdOutlineSentimentVerySatisfied size={50} /> }
    ]
    const MySwal = withReactContent(Swal)
    const showReviewDialog = () => {
        MySwal.fire({
            title: 'Danos tu opinión aquí ',
            html:
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Rating
                        onClick={e => localStorage.setItem('rating', e)}
                        customIcons={customIcons}
                        emptyStyle={{ display: "flex" }}
                        fillStyle={{ display: "-webkit-inline-box" }}
                        transition
                        allowFraction
                        showTooltip
                    />
                    <textarea className="swal2-textarea" placeholder="¿Estas satisfecho con la persona encontrada?" id="review"></textarea>
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
        const rating = localStorage.getItem('rating')
        // console.log(MySwal.getPopup().querySelector('#rate').value)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        Swal.fire({
            title: 'Gracias!',
            text: 'Su retroalimentación se envió de forma exitosa!',
            icon: 'success'
        });
        // axios.post(`${process.env.REACT_APP_API_URL}/api/review/match`, { rating, review}, config)
        //   .then(response => {
        //     console.log(response.data)
        //     console.log(response.status)
        //     // Imprimir el valor de las estrellas y el comentario
        //     console.log("Valor de las estrellas:", rating);
        //     console.log("Comentario:", review);

        //     Swal.fire({
        //       title: 'Gracias!',
        //       text: 'Su retroalimentacion se se envio de forma exitosa',
        //       icon: 'success'
        //     });
        //   })
        //   .catch(error => {
        //     Swal.fire({
        //       title: 'Oops...',
        //       text: 'Ocurrio un error al enviar la retroalimentacion',
        //       icon: 'error'
        //     });
        //   });
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
                    <div className="w-64 h-64 rounded-lg flex flex-col justify-center items-center text-center">
                        <p className=" text-white font-bold mb-4">
                            Oprime el botón para hacer el match
                        </p>
                        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Match
                        </button>
                    </div>
                )}
                {isDelay && (
                    <div className="w-64 h-64 rounded-lg flex flex-col justify-center items-center">
                        <p className="text-white font-bold mb-4">
                            Buscando los mejores compañeros de juego para ti. Tiempo: {delaySeconds} segundos...
                        </p>
                        <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancelar
                        </button>
                    </div>
                )}
                {isButtonPressed && similarUsers.length > 0 && (
                    // PONER LA GRID PARA QUE APAREZCAN SOLO LOS USUARIOS
                    <div className="flex flex-col text-center items-center ">
                    <h2 className="text-white mb-12 text-3xl font-bold">¡Felicidades! Estos son los usuarios con gustos similares a los tuyos: </h2>
                    <div className="w-34 grid grid-cols-3 gap-7 justify-items-center place-items-center">
                        {similarUsers.map(user => (
                        <Link key={user.id} to={`/profile/${user.id}`}>
                            <div  className="flex flex-col items-center mb w-72 h-72 py-20 bg-friend-list">
                                <img
                                    alt="..."
                                    className="rounded-md align-middle border-none bg-cover shadow-lg w-24 h-24 mb-4"
                                    src={defaultProfile}
                                />
                               <p className="text-white"> {user.name} - Similitud: {Math.round(user.similarity * 100, 0)} </p>
                            </div>
                        </Link>
                        ))}
                    </div>
                    <button onClick={showReviewDialog} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/4 mt-6">
                                Review del Match
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Match;
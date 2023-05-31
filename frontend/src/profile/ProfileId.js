import React, { useEffect, useState, } from "react";
import axios from "../apiConnection";
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbars/AuthNavbar.js";
import { useNavigate } from 'react-router-dom'
import UserInformation from './UserInformation';
import UserIntereses from "./UserIntereses.jsx";
import UserLogros from "./UserLogros.jsx";
import UserGames from "./UserGames.jsx";
import ProfileIcon from '../assets/profileicon.jpg'

function ProfileId() {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [view, setView] = useState({ showInfo: true, showIntereses: false, showLogros: false, showGames: false });

    function showInfo() {
        setView({ ...view, showInfo: true, showIntereses: false, showLogros: false, showGames: false });
    }
    function showIntereses() {
        setView({ ...view, showInfo: false, showIntereses: true, showLogros: false, showGames: false });
    }
    function showLogros() {
        setView({ ...view, showInfo: false, showIntereses: false, showLogros: true, showGames: false });
    }
    function showGames() {
        setView({ ...view, showInfo: false, showIntereses: false, showLogros: false, showGames: true });
    }

    useEffect(() => {
        async function fetchUser() {
            const res = await axios(`${process.env.REACT_APP_API_URL}/profile/${id}/`);
            setUser(res.data.info);
        }
        fetchUser();
    }, [id]);
    if (!user) {
        return (
            <div className="flex w-screen items-center justify-center h-screen" id="contenedor">
                <div className="flex flex-col">
                    <div className="loader" id="loader"> </div>
                    <h1 className="text-white font-bold"> Cargando perfil de usuario...</h1>
                </div>
            </div>
        )
    }

    const handleAddFriend = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/add_friends/`, {
            'user_id': id // el ID del user al que se le quiere enviar la solicitud
        }, config);
        setRequestSent(true);
    }

    return (
        <>
            <Navbar transparent />
            <section className="block h-500-px">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        height: "55%",
                        backgroundImage:
                            "url('https://www.xtrafondos.com/wallpapers/control-de-playstation-10819.jpg')",
                    }}
                >
                </div>
            </section>
            <main className="profile-page bg-dark-purple flex items-center justify-center">
                <section
                    className="py-80 w-full">
                    <div className="container mx-auto px-10">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg ">
                            <div className="px-6">
                                <div className="container ">
                                    <div className="flex flex-wrap">
                                        <section className="w-1/6">
                                            <img
                                                className="rounded-full w-full object-contain"
                                                src={ProfileIcon}
                                                alt="screenshot"
                                            />
                                        </section>

                                        <div className="text-center  w-64 h-64 flex justify-center items-center">
                                            <div className="flex flex-col items-center">
                                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                                                    {user.name}
                                                </h3>
                                                <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700">
                                                    {user.age} años
                                                </p>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                                <div className="flex flex-row items-center mt-8 ">
                                    <button
                                        className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={showInfo}
                                    >
                                        Información
                                    </button>

                                    <button
                                        className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={showIntereses}
                                    >
                                        Intereses
                                    </button>

                                    <button
                                        className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={showLogros}
                                    >
                                        Logros y trofeos
                                    </button>
                                    <button
                                        className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={showGames}
                                    >
                                        Juegos Preferidos
                                    </button>
                                    <button
                                        className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit"
                                        onClick={handleAddFriend}
                                    >
                                        Añadir amigo
                                    </button>
                                    <button
                                        className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit"
                                        onClick={(e) => {
                                            Navigate(`../chat/${id}`);
                                        }}
                                    >
                                        Enviar mensaje
                                    </button>
                                </div>
                                <div className="container ">
                                    <div>
                                        {view.showInfo && <UserInformation usuario={user} />}
                                    </div>

                                    <div>
                                        {view.showIntereses && <UserIntereses usuario={user} />}
                                    </div>

                                    <div>
                                        {view.showLogros && <UserLogros usuario={user} />}
                                    </div>

                                    <div>
                                        {view.showGames && <UserGames usuario={user} itsMe={false} id={id} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ProfileId
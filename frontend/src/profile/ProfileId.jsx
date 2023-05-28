import React, { useEffect, useState } from "react";
import "./Profile.css";
import Feed from "../components/feed/Feed";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ProfileIcon from '../assets/profileicon.jpg'
import Swal from 'sweetalert2'

function Profile() {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [viewData, setViewData] = useState({ data: "", title: "" });
    const [requestSent, setRequestSent] = useState(false);
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };
    function showIntereses() {
        setViewData({ data: usuario.intereses, title: "Intereses" });
    }
    function showLogros() {
        setViewData({ data: usuario.logros_y_trofeos, title: "Logros y trofeos" });
    }

    const handleAddFriend = async () => {
        
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/add_friends/`, {
            'user_id': id // el ID del user al que se le quiere enviar la solicitud
        }, config);
        if (res) {
            Swal.fire({
                icon: 'success',
                title: 'Amigo agregado de forma exitosa',
                allowEscapeKey: false,
            })
        }
        setRequestSent(true);
    }

    useEffect(() => {
        async function fetchUser() {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/profile/${id}/`,
                {"id_friend":id},
                config
                );
            setUsuario(res.data.info);
            console.log(usuario)
            setViewData({ data: res.data.info.intereses, title: "Intereses" });
        }
        fetchUser();
    }, [id]);
    if (!usuario) {
        return (
            <div className="flex w-screen items-center justify-center h-screen" id="contenedor">
                <div className="flex flex-col">
                    <div className="loaderChatSide" id="loaderChatSide"> </div>
                    <h1 className="text-white font-bold"> Cargando perfil de usuario...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full h-full">
            <SideBar />

            <div className="profile">
                <div className="fbIcon">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <img height='60px' src={"../assets/icon.png"} alt="" />
                    </Link>
                </div>
                <div className="profileContainer">
                    <div className="profileCenter">
                        <div className="profileCenterTop">
                            <img
                                src={"https://www.xtrafondos.com/wallpapers/control-de-playstation-10819.jpg"}
                                alt="coverphoto"
                                className="coverPhoto"
                            />
                        </div>
                        <div className="profileCenterDown">
                            <div className="profileCenterDownCont">
                                <div className="profilePhotoCont">
                                    <img
                                        src={ProfileIcon}
                                        alt="profiephoto"
                                        className="profilePhoto"
                                    />
                                </div>
                                <h4 className="profileUsername">
                                    {usuario.name}{" "}
                                    {usuario.age &&
                                        <p style={{ fontSize: "16px", margin: "0", opacity: "0.5" }}>
                                            {usuario.age} años
                                            {/* 209 friends */}
                                        </p>
                                    }
                                </h4>
                            </div>
                        </div>

                        <div className="buttonSettings">
                            <button
                                className="bg-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                                onClick={showIntereses}
                            >
                                Intereses
                            </button>

                            <button
                                className="bg-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                                onClick={showLogros}
                            >
                                Logros y trofeos
                            </button>
                            <button
                                className="bg-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={(e) => {
                                    Navigate(`../chat/${id}`);
                                }}
                            >
                                Enviar mensaje
                            </button>
                        </div>

                        <div className="profileBottom">

                            <div className="profileBottomLeft">
                                <div className="profileUserInfo">
                                    <h2 className="aboutMeHeading">Acerca de mí</h2>
                                    <div className="aboutMeText">{usuario.about_me}</div>
                                    {!requestSent && !usuario.is_friend &&
                                        <button className="bg-gray active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            onClick={handleAddFriend}
                                        >
                                            Añadir amigo
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className="profileBottomRight">
                                <Feed disableShare={true} viewData={viewData} usuario={usuario} id={id} itsMe={false} className="profileFeed" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

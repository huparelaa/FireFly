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
import AddPersonIcon from '../assets/agregar-usuario.png'
import MensajeIcon from '../assets/comentario.png'

function Profile() {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

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
        setViewData({
          data: usuario.intereses,
          title: (
            <span className="underline">
              Intereses
            </span>
          ),
        });
      }
      
      function showLogros() {
        setViewData({
          data: usuario.logros_y_trofeos,
          title: (
            <span>
              <span className="underline">Logros y trofeos</span> 
            </span>
          ),
        });
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
            setLoading(true);
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/profile/${id}/`,
                { "id_friend": id },
                config
            );
            setUsuario(res.data.info);
            console.log(res.data.info)
            setViewData({
                data: res.data.info.intereses,
                title: (
                  <span className="underline">
                    Intereses
                  </span>
                ),
              });
              
            setLoading(false);
        }
        fetchUser();
    }, [id]);
    if (!usuario && loading) {
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
                        <div className="profileCenterTop ">
                            <img
                                src={usuario.background_photo ? `${process.env.REACT_APP_API_URL}${usuario.background_photo}` : "https://www.xtrafondos.com/wallpapers/control-de-playstation-10819.jpg"}
                                alt="coverphoto"
                                className="coverPhoto"

                            />
                            <div className="flex editCoverPhotoBtn">
                                {!requestSent && !usuario.is_friend && (
                                    <button
                                        className="bg-login-button-hover text-white flex items-center justify-center w-[140px] h-[40px]"
                                        type="submit"
                                        onClick={handleAddFriend}
                                    >
                                        <img
                                            src={AddPersonIcon}
                                            alt="Agregar persona"
                                            className="mr-2"
                                        />
                                        Añadir amigo
                                    </button>
                                )}
                                <button
                                    className="bg-login-button-hover text-white flex items-center justify-center ml-4 w-[110px] h-[40px]"
                                    onClick={(e) => {
                                        Navigate(`../chat/${id}`);
                                    }}
                                >
                                    <img
                                        src={MensajeIcon}
                                        alt="Agregar persona"
                                        className="mr-2"
                                    />
                                    Mensaje
                                </button>

                            </div>


                        </div>
                        <div className="profileCenterDown">
                            <div className="profileCenterDownCont">
                                <div className="profilePhotoCont">
                                    <img
                                        src={usuario.photo ? `${process.env.REACT_APP_API_URL}${usuario.photo}` : ProfileIcon}
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

                        <div className="profileBottom">

                            <div className="profileBottomLeft  bg-info-home">
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-login-button-hover active:bg-blueGray-600 text-white font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={showIntereses}
                                    >
                                        Intereses
                                    </button>

                                    <button
                                        className="bg-login-button-hover active:bg-blueGray-600 text-white font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={showLogros}
                                    >
                                        Logros y trofeos
                                    </button>
                                </div>
                                <div className="profileUserInfo text-zinc-100">
                                    <h2 className="aboutMeHeading text-white border-b border-white">Acerca de mí</h2>
                                    <div className="aboutMeText">{usuario.about_me}</div>
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

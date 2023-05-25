import React, { useEffect, useState } from "react";
import "./Profile.css";
import Feed from "../components/feed/Feed";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '../assets/profileicon.jpg'
import { FriendList } from "../components/FriendList";

function Profile() {
    const Navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [viewData, setViewData] = useState({data:"",title:""});

    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };

    useEffect(() => {
        async function getPhotoName() {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/`, config)
                .then(response => {
                    setUsuario(response.data);
                    setViewData({data:response.data.intereses,title:"Intereses"});
                })
                .catch(error => {
                    console.error(error);
                });
        }
        getPhotoName()
    }, []);


    function showIntereses() {
        setViewData({data:usuario.intereses,title:"Intereses"});
    }
    function showLogros() {
        setViewData({data:usuario.logros_y_trofeos,title:"Logros y trofeos"});
    }

    if (!usuario) {
        return (
            <div className="flex w-1/6 items-center justify-end mr-10" id="contenedor">
                <div className="loaderChatSide" id="loaderChatSide"> </div>
                <p className="text-white"> Cargando Perfil de Usuario...</p>
            </div>
        )
    }

    return (
        <div className="flex w-full h-full overflow-hidden">
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
                            <button className="editCoverPhotoBtn">
                                {/* <CameraAltIcon /> */}
                                <b>Subir <span className="editPicText">fondo</span></b>
                            </button>
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
                        </div>

                        <div className="profileBottom">
                            
                            <div className="profileBottomLeft">
                                <div className="profileUserInfo">
                                    <h2 className="aboutMeHeading">Acerca de mi</h2>
                                    <div className="aboutMeText">{usuario.about_me}</div>
                                    <button className="bg-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-full ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={(e) => {
                                            Navigate("/profile/edit");
                                        }}
                                    >
                                        Editar perfil
                                    </button>
                                    <FriendList/>
                                </div>
                            </div>
                            <div className="profileBottomRight">
                                <Feed disableShare={true} viewData={viewData} usuario={usuario} id={0} itsMe={true} className="profileFeed" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

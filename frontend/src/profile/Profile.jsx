import React, { useEffect, useState } from "react";
import "./Profile.css";
import Feed from "../components/feed/Feed";
import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import axios from '../apiConnection'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '../assets/profileicon.jpg'
import { FriendList } from "../components/FriendList";
import Swal from 'sweetalert2';
import SubirIcon from '../assets/subir.png'

function Profile() {
    const Navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [viewData, setViewData] = useState({ data: "", title: "" });
    const [newFotoUsuario, setNewFotoUsuario] = useState(false);
    const [image, setImage] = useState(null);

    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };

    const handleUploadCoverPhoto = () => {
        Swal.fire({
            title: 'Actualizar fondo de perfil',
            html: `
            <input
              id="photo-input"
              type="file"
              accept="image/*"
            >
          `,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            preConfirm: () => {
                const fileInput = document.getElementById('photo-input');
                const file = fileInput.files[0];

                // Perform any further processing or handling of the uploaded photo here

                return file;
            },
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
        }).then(async (result) => {
            if (result.isConfirmed) {
                const uploadedPhoto = result.value;
                const config2 = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json',
                    }
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageDataUrl = reader.result;
                    setImage(imageDataUrl);
                    setNewFotoUsuario(true);
                };
                reader.readAsDataURL(uploadedPhoto);


                const formData = new FormData();
                formData.append("background_photo", uploadedPhoto, uploadedPhoto.name);
                await axios.post(`${process.env.REACT_APP_API_URL}/api/profile/upload_background_photo/`, formData, config2);
                // Perform any further actions with the uploaded photo here
                Swal.fire({
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'success',
                    title: `¡Se ha actualizado el fondo de perfil!`,
                })
            }
        });
    };

    useEffect(() => {
        async function getPhotoName() {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/`, config)
                .then(response => {
                    setUsuario(response.data);
                    setViewData({
                        data: response.data.intereses,
                        title: (
                            <span className="">
                                Intereses
                            </span>
                        ),
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }
        getPhotoName()
    }, []);


    function showIntereses() {
        setViewData({
            data: usuario.intereses,
            title: (
                <span>
                    <span className="">Intereses</span>
                </span>
            ),
        });
    }

    function showLogros() {
        setViewData({
            data: usuario.logros_y_trofeos,
            title: (
                <span>
                    <span className="">Logros y trofeos</span>
                </span>
            ),
        });
    }


    if (!usuario) {
        return (
            <div className="flex w-screen items-center justify-center h-screen" id="contenedor">
                <div className="flex flex-col">
                    <div className="loader" id="loader"> </div>
                    <h1 className="text-white font-bold"> Cargando perfil de usuario...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full h-full">
            <SideBar />
            <div className="profile">
                <div className="fbIcon ">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <img height='60px' src={"../assets/icon.png"} alt="" />
                    </Link>
                </div>
                <div className="profileContainer ">
                    <div className="profileCenter ">
                        <div className="profileCenterTop">
                            {newFotoUsuario ?
                                <img
                                    src={image}
                                    alt="coverphoto"
                                    className="coverPhoto"
                                />
                                :
                                <img
                                    src={usuario.background_photo ? `${process.env.REACT_APP_API_URL}${usuario.background_photo}` : "https://www.xtrafondos.com/wallpapers/control-de-playstation-10819.jpg"}
                                    alt="coverphoto"
                                    className="coverPhoto"
                                />
                            }
                            <button
                                className="editCoverPhotoBtn bg-login-button-hover text-white justify-center w-[140px] h-[35px]"
                                onClick={handleUploadCoverPhoto}
                            >
                                <img
                                    src={SubirIcon}
                                    alt="Agregar persona"
                                    className="mr-2"
                                />
                                {/* <CameraAltIcon /> */}
                                <b>Subir <span className="editPicText">fondo</span></b>
                            </button>
                        </div>
                        <div className="profileCenterDown  ">
                            <div className="profileCenterDownCont">
                                <div className="profilePhotoCont">
                                    <img
                                        src={usuario.photo ? `${process.env.REACT_APP_API_URL}${usuario.photo}` : ProfileIcon}
                                        alt="profiephoto"
                                        className="profilePhoto " // Aplica la clase aquí
                                    />
                                </div>
                                <h4 className="profileUsername">
                                    {usuario.name} {usuario.lastname}{" "}
                                    {usuario.age &&
                                        <p style={{ fontSize: "16px", margin: "0", opacity: "0.5" }}>
                                            {usuario.age} años
                                            {/* 209 friends */}
                                        </p>
                                    }

                                </h4>
                            </div>
                            <div className="profilePhoto">
                            </div>
                        </div>
                        <div className="userAboutBtn ml-12">
                            <div className="flex">
                                <div className="userEditBtn">
                                    <button
                                        className="bg-login-button-hover active:bg-blueGray-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={(e) => {
                                            Navigate("/profile/edit");
                                        }}
                                    >
                                        Editar perfil
                                    </button>
                                </div>
                                <div className="flex justify-center items-center w-4/5">
                                    <button
                                        className="bg-login-button-hover active:bg-blueGray-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit "
                                        onClick={showIntereses}
                                    >
                                        Intereses
                                    </button>


                                    <button
                                        className="bg-login-button-hover active:bg-blueGray-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={showLogros}
                                    >
                                        Logros y trofeos
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className="profileBottom ">
                            <div className="profileBottomLeft bg-info-home">
                                <div className="profileUserInfo text-zinc-100">
                                    <h2 className="aboutMeHeading text-white border-white mt-3">Acerca de mí</h2>
                                    <div className="aboutMeText m-4 text-lg text-justify">{usuario.about_me}</div>
                                </div>
                            </div>


                            <div className="profileBottomRight  ">
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

import React, { useEffect, useState, } from "react";
import axios from "axios";
import defaultProfile from "../assets/defaultProfile.jpg"
import  {useParams} from 'react-router-dom'
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

function ProfileId(){
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const res = await axios(`${process.env.REACT_APP_API_URL}/profile/${id}/`);
            setUser(res.data.info);
        }
        fetchUser();
    }, [id]);
    if (!user) {
        return (
            <div className="flex w-1/6 items-center justify-end mr-10" id="contenedor">
              <div className="loaderChatSide" id="loaderChatSide"> </div>
              <p className="text-white"> Cargando Perfil de Usuario...</p> 
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
            'user_id': id // el ID del usuario al que se le quiere enviar la solicitud
        }, config);
        setRequestSent(true);
    }

    return (
        <main className="profile-page bg-white flex items-center justify-center">
            <Link className="flex items-center  relative bottom-96 right-32" to={"/dashboard"}>< MdArrowBackIos /> <p>Volver</p></Link>
            <section className="py-20 w-3/4">
                <div className="container mx-auto px-10">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <section className="hero container w-1/2  ">
                                    <img style={{}} className="mx-auto rounded-full w-1/2" src={defaultProfile} alt="screenshot" />
                                </section>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    {user.name}
                                </h3>
                            </div>
                            <div className="text-center mt-12">
                                <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    Email: {user.email}
                                </p>
                            </div>
                            <div className="text-center mt-12">
                                <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    Edad: {user.age}
                                </p>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            Acerca de mi:
                                        </p>
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            {user.about_me}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                    <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Intereses:
                                     </p> 
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            {user.intereses}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                    <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Logros y Trofeos:
                                    </p>
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            {user.logros_y_trofeos}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="submit"
                                onClick={handleAddFriend}
                            >
                                Añadir amigo
                            </button>
                            <Link to={`../chat/${id}`} className="mt-auto">
                                <button
                                    className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Enviar Mensaje
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProfileId
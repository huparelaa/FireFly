import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import emailjs from '@emailjs/browser';
import axios from '../apiConnection'

import control from "../assets/control.png"
import home from "../assets/home.svg"
import match from "../assets/match.svg"
import group from "../assets/group.svg"
import chat from "../assets/chat.svg"
import logout from "../assets/logout.svg"
import logo from "../assets/Recurso 3.svg"
import report from "../assets/report.png"

function SideBar() {
    const [usuario, setUsuario] = useState(null);
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };

    useEffect(() => {
        async function getUser() {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/`, config)
                .then(response => {
                    setUsuario(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        getUser()
    }, []);

    const sendEmail = (event) => {
        event.preventDefault();
        emailjs.sendForm('service_wsmvq0j', 'template_04co69t', event.target, 'k8ix7MNKP0nIkPwYA')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        Swal.close();
        Swal.fire({
            title: '¡Gracias!',
            text: 'Tu reporte se ha enviado de forma exitosa',
            icon: 'success'
        });
    };

    const Report = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Reporte de error del sistema',
            html:
                <form onSubmit={sendEmail}>
                    <input className="h-12 bg-slate-200 w-8/12" type="hidden" name="user_name" value={usuario.name} />
                    <input className="h-12 bg-slate-200 w-8/12" type="hidden" name="user_email" value={usuario.email} />
                    <label className="font-medium"> Mensaje: </label> <br/><br/>
                    <textarea placeholder="Escribe tu reporte" className="px-4 py-3 text-black h-12 bg-slate-200 w-8/12" name="message" required /> <br /><br />
                    <button type="submit" 
                    className="text-base font-medium text-white bg-indigo-900 rounded-md hover:bg-indigo-700" style={{padding:"0.75rem"}}> Enviar Reporte </button>
                </form>,
            color: '#ffffff',
            background: '#17152a',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#E02424',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelado!',
                    text: 'Su reporte fue cancelado!',
                    icon: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                });
            }
        })
    };

    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Dashboard", src: home, path: "/dashboard" },
        { title: "Match", src: match, path: "/match" },
        { title: "Chat", src: chat, path: "/chat" },
        { title: "Logout", src: logout, gap: true, path: "/logout" },
    ];
    return (
        <div className="flex shadow-sm h-screen fixed z-50">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-dark-bg h-full p-5 rounded-md pt-10 -bottom-0 relative duration-300 `}
            >
                <img
                    src={control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                    alt=""
                />
                <Link to={"/dashboard"}>
                    <div className="flex gap-x-4 items-center justify-items-center ml-1">
                        <img
                            src={logo}
                            className={`cursor-pointer w-9 duration-500 ${open && "rotate-[360deg]"
                                }`}
                            alt=""
                        />
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200  ${!open && "scale-0"
                                }`}> FireFly
                        </h1>
                    </div>
                </Link>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <NavLink
                            to={Menu.path}
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${Menu.gap ? "mt-80" : "mt-2"}`} >
                            <img src={`${Menu.src}`} className="w-6" alt="" />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </NavLink>
                    ))}
                    <button onClick={Report} className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2" >
                        <img src={report} alt="" className="w-6" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            Report
                        </span>
                    </button>
                </ul>
            </div>
        </div>
    )
}

export { SideBar }
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import control from "../assets/control.png"
import home from "../assets/home.svg"
import match from "../assets/match.svg"
import group from "../assets/group.svg"
import chat from "../assets/chat.svg"
import logout from "../assets/logout.svg"
import logo from "../assets/Recurso 3.svg"
import report from "../assets/report.png"

function SideBar() {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_wsmvq0j', 'template_04co69t', form.current, 'k8ix7MNKP0nIkPwYA')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    const Report = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Reporte De Error Del Sistema',
            html:
                <form ref={form} onSubmit={sendEmail}>
                    <label className="mt-2">Name</label><br/>
                    <input className="h-12 bg-slate-200 w-8/12" type="text" name="user_name" /> <br/>
                    <label>Email</label> <br/>
                    <input className="h-12 bg-slate-200 w-8/12" type="email" name="user_email" /><br/>
                    <label>Message</label> <br/>
                    <textarea className="h-12 bg-slate-200 w-8/12" name="message" />
                </form>,
            confirmButtonText: 'Enviar',
            preConfirm: submitReview,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        });
    };

    const submitReview = () => {
        Swal.fire({
            title: 'Gracias!',
            text: 'Su reporte se envió de forma exitosa!',
            icon: 'success'
        });
    };

    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Dashboard", src: home, path: "/dashboard" },
        { title: "Match", src: match, path: "/match" },
        { title: "Forum", src: group, path: "/forum" },
        { title: "Chat", src: chat, path: "/chat" },
        { title: "Logout", src: logout, gap: true, path: "/" },
        { title: "Analytics", src: "da", path: "/Analytics" },
    ];
    return (
        <div className="flex shadow-sm">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-dark-bg h-screen p-5 rounded-md pt-8 relative duration-300 `}
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
                        ${Menu.gap ? "mt-96" : "mt-2"}`} >
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
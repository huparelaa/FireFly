import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logoPrincipal from "../assets/Logo-principal.svg"
import btn1_enter from "../assets/enter.svg"
import { useMediaQuery } from 'react-responsive'

function Header(){
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    const isMinor = useMediaQuery({ query: '(min-width: 641px) and (max-width: 767px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    }
    const closeMenu = () => {
        setShowMenu(false)
    }
    useEffect(() => {
        if (showMenu) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        }, [showMenu]);

    function Menu(){
        return (
            <>
            <div className="fixed top-0 bottom-0 right-0 left-0 z-40 opacity-100 bg-black-rgba" onClick={closeMenu} ></div>
            <div className={`flex flex-col bg-login-button fixed top-0 -bottom-1 right-0 box-border z-50 w-80 rounded-tl-lg rounded-bl-lg 
                `} >
                <div className="flex justify-between p-6 items-center ">
                    <img src={logoPrincipal} className="w-36" alt =""/>
                    <button onClick={closeMenu}>
                        <svg width="20" height="20" viewBox="0 0 12 12">
                            <g fill="none" fillRule="evenodd" aria-hidden="true"><path d="M0 0h12v12H0"></path>
                                <path fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6">
                                </path>
                            </g>
                        </svg>
                    </button>
                </div>
                <hr className="w-10/12 ml-7"/>
                <div className="box-border flex flex-col ml-5 justify-between h-full">
                    <div className="flex flex-col">
                        <Link key="Quienes-somos" className="mr-24 transition rounded-full duration-500 hover:bg-login-button hover:shadow-xl p-4">
                            ¿Quiénes somos?
                        </Link>
                        <Link key="comunidad" className="mr-8 hover:bg-login-button hover:shadow-xl p-4 transition rounded-full duration-500" >
                            Comunidad
                        </Link> 
                    </div>
                    <div className="flex flex-col mb-10 md:mb-20">
                        <Link to="/login">
                            <button className="bg-login-button-hover transition duration-500 ease-in-out 
                                    p-4 flex items-center rounded-full shadow-xl hover:bg-login-button-hover mr-6 w-48">
                                <img src={btn1_enter} className="w-5  mr-3" lt =""/>
                                Iniciar Sesión
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="w-48 bg-blue-600 transition duration-500 ease-in-out 
                                p-4 text-center rounded-full shadow-xl hover:bg-blue-900 mt-3">
                                Registrate
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
        )
    }
    return (
    <div className="w-full grid gap-x-5 xl:grid-cols-12 md:grid-cols-8 sm:grid-cols-4 px-6 xl:px-24 xl:pt-2" >
        <header className="flex xl:col-span-12 md:col-span-8 sm:col-span-4">
            <nav className="flex w-full h-20 justify-between items-center text-white">
                    <Link>
                        <img src={logoPrincipal} alt="Logo" className="xl:w-44 md:w-44 w-36"/>
                    </Link>
                    {(isDesktopOrLaptop) && (
                    <>
                    <div className="mx-28 mb-1 box-border">
                        <Link key="Quienes-somos" className="mr-24 transition rounded-full duration-500 hover:bg-login-button hover:shadow-xl p-4">
                            ¿Quiénes somos?
                        </Link>
                        <Link key="comunidad" className="mr-8 hover:bg-login-button hover:shadow-xl p-4 transition rounded-full duration-500" >
                            Comunidad 
                        </Link>
                    </div>
                    <Link to="/login">
                        <button className="bg-login-button transition duration-500 ease-in-out 
                                p-4 flex items-center rounded-full shadow-xl hover:bg-blue-900 mr-6">
                            <img src={btn1_enter} className="w-5 mr-3" alt =""/>
                            Iniciar Sesión
                        </button>
                    </Link>
                    
                    </>
                    )}
                    {(isTablet) && (
                    <div className="flex items-center">
                        <Link to="/login">
                            <button className="bg-login-button transition duration-500 ease-in-out 
                                p-4 flex items-center rounded-full shadow-xl hover:bg-login-button-hover mr-6">
                                <img src={btn1_enter} className="w-5 mr-3" alt =""/>
                                Iniciar Sesión
                            </button>
                        </Link>
                        <button className="mb-2" onClick={toggleMenu}> 
                            <svg width="40" height="40" viewBox="0 0 40 40">
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" 
                                d="M33.3327 10H6.66602V15H33.3327V10ZM6.66602 18.3317H33.3327V23.3317H6.66602V18.3317ZM6.66602 26.665H33.3327V31.665H6.66602V26.665Z">
                                </path>
                            </svg>
                        </button>
                        {showMenu && <Menu />}
                    </div>
                    )}        
                    {(isMobile || isMinor) && (
                    <>
                    <button className="mb-3" onClick={toggleMenu}>
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" 
                            d="M33.3327 10H6.66602V15H33.3327V10ZM6.66602 18.3317H33.3327V23.3317H6.66602V18.3317ZM6.66602 26.665H33.3327V31.665H6.66602V26.665Z">
                            </path>
                        </svg>
                    </button>
                    {showMenu && <Menu />}
                    </>
                    )}
            </nav>
        </header>
    </div>
    )
}
export {Header}
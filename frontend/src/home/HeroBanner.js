import React from "react";
import moon from "../assets/moonprincipal.svg"
import mountains from "../assets/bgPrincipal.svg"
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import btn1_enter from "../assets/enter.svg"

function HeroBanner(){
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    const isMobile = useMediaQuery({ query: '(min-width: 360px) and (max-width: 767px)' });
    
    return (
        <div className="w-full relative">
            <div className="w-full">
            <div className="flex justify-center relative">
                <img src={moon} className="mix-blend-screen xl:w-2/6 md:w-2/6 sm:w-1/3 relative bottom-20 -z-10" alt =""/>
            </div>
            {(isDesktopOrLaptop || isTablet) && (
                <img src={mountains} className="absolute w-full bottom-0 -z-40" alt = ""/>
            )}

            </div>
            <div className="w-full relative xl:-top-40 md:-top-28 -top-40">
                <div className="flex flex-col items-center text-white relative">
                    <div className="flex flex-col items-center text-center"> 
                    <h3 className="font-extrabold font-roboto xl:text-4xl md:text-3xl sm:text-xl mx-6">
                            ENCUENTRA A TU COMPAÑERO DE JUEGO IDEAL
                        </h3>
                        <p className="font-light my-6 mx-6">
                            ¡En FireFly puedes hacer ese sueño realidad! 
                            Encuentra amigos, chatea y haz parte de la mejor comunidad del mundo
                        </p>
                        <Link to="/signup">
                            <button className="w-48 bg-blue-900 transition duration-500 ease-in-out 
                                p-4 text-center rounded-full shadow-xl hover:bg-register-button">
                                Regístrate
                            </button>
                        </Link>
                        {isMobile && (
                            <>
                            <Link to="/login">
                                <button className="w-48 bg-login-button
                                        p-4 flex items-center justify-center rounded-full shadow-xl hover:bg-blue-900 mt-6">
                                    <img src={btn1_enter} className="w-5  mr-3" alt =""/>
                                    Iniciar Sesión
                                </button>
                            </Link>
                            <div className="w-full flex flex-col items-center relative top-24 box-border">
                            <hr className="w-11/12"/>
                            <h4 className="font-bold font-roboto mt-3">Aquí encontrarás</h4>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export {HeroBanner}
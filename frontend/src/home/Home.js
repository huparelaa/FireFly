import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import principalImg from './principalimg.png';
import FireFlyPng from './Recurso_1.svg';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesConfig from "./particles2.json";
import logo from "../assets/Recurso 3.svg"
import './diseño.css';
import Footer from './Footer.js';


const Home = () => {
    const [isHovered, setIsHovered] = useState(false);

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className='w-screen h-screen'>
            <Particles
                style={{ position: "relative" }}
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesConfig}
            />
            <header>
                <nav className='header-nav'>
                    <ul className='header-nav__ul'>
                        <section className='nav-side-left ml-8'>
                            <Link to="https://github.com/huparelaa/FireFly" target="_blank">
                                <div className="container" style={{ position: "relative" }}>
                                    {isHovered && (
                                        <div
                                            className="shining"
                                            style={{
                                                position: "absolute",
                                                top: 10,
                                                left: 20,
                                            }}
                                        ></div>
                                    )}
                                    <div>
                                        <img
                                            className="logo"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            src={FireFlyPng}
                                            alt=""
                                            style={{
                                                position: "relative",
                                                top: "10px",
                                                height: "50px",
                                                marginRight: "15px",
                                                left: "10px",
                                            }}
                                        />
                                    </div>
                                </div>
                            </Link>

                        </section>
                        <section className='nav-side-right'>
                            <li className='nav-side-right__li'><a href='/'>Explorar🌎</a></li>
                            <li className='nav-side-right__li'><a href='/'>Quiénes somos❓</a></li>
                            <li className='nav-side-right__li'><a href='/'>Comunidad👥</a></li>
                            <li className='nav-side-right__li'><a href='/'>Ayuda🆘</a></li>
                            <li className='nav-side-right__li'>
                                <Link to="/login">
                                    <button className="button-func hover:bg-slate-600  shadow-md">
                                        Login
                                    </button>
                                </Link>
                            </li>
                        </section>
                    </ul>
                </nav>
            </header>
            <main className='home-main'>
                <section className='home-main__right'>
                    <p className='home-man-pg mb-6'>
                        Encuentra a tus compañeros de juego ideales para tus gustos
                    </p>
                    <Link to="/signup"><button className="button-func hover:bg-slate-600 shadow-md">Sign Up</button></Link>
                </section>
                <section className='home-main__left'>
                    <div className='home-main__circle'>
                        <img className='home-img' src={principalImg} alt='' />
                    </div>
                </section>
            </main>
            <div className="footer-container bg-gray-900 py-30 fixed bottom-0 w-full">
                <Footer />
            </div>
        </div>
    );
};

export default Home;

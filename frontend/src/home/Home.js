import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import principalImg from './principalimg.png';
import FireFlyPng from './Recurso_1.svg';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesConfig from "./particles2.json";
import './diseño.css';

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
        <div>
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
                        <section className='nav-side-left'>
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
                                    <button className="button-func">
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
                    <p className='home-man-pg'>
                        Encuentra a tus compañeros de juego ideales para tus gustos🎮
                    </p>
                    <Link to="/signup"><button className="button-func">Sign Up</button></Link>
                </section>
                <section className='home-main__left'>
                    <div className='home-main__circle'>
                        <img className='home-img' src={principalImg} alt='' />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;

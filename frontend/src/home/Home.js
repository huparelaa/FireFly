import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import principalImg from './principalimg.png'
import FireFlyPng from './FireFlyPng.png'
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesConfig from "./particles2.json";

const Home = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (


        <div>

            <Particles
                style={{ position: "relative" }}
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesConfig}
            />

            <React.Fragment>
                <header>
                    <nav className='header-nav'>
                        <ul className='header-nav__ul'>
                            <section className='nav-side-left'>
                                <div>
                                    <img className='logo' src={FireFlyPng} alt='' style={{ position: 'relative', top: '10px', height: '50px' }} />
                                </div>

                            </section>
                            <section className='nav-side-right'>
                                <li className='nav-side-right__li'><a href='/'>Explorar🌎</a></li>
                                <li className='nav-side-right__li'><a href='/'>Quienes somos❓</a></li>
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
                            Encuentra a tus compañeros de juego ideales🎮
                        </p>
                        <Link to="/signup"><button className="button-func">Sign Up</button></Link>
                    </section>
                    <section className='home-main__left'>
                        <div className='home-main__circle'>
                            <img className='home-img' src={principalImg} alt='' />
                        </div>


                    </section>
                </main>
            </React.Fragment>
        </div>

    );
};


export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import principalImg from './principalimg.png'
const Home = () => {
    return (
        <React.Fragment>
            <header>
                <nav className='header-nav'>
                    <ul className='header-nav__ul'> 
                        <section className='nav-side-left'>
                            <div>Logo</div>
                        </section>
                        <section className='nav-side-right'>
                            <li className='nav-side-right__li'><a href='/'>Explorar</a></li>
                            <li className='nav-side-right__li'><a href='/'>Quienes somos</a></li>
                            <li className='nav-side-right__li'><a href='/'>Comunidad</a></li>
                            <li className='nav-side-right__li'><a href='/'>Ayuda</a></li>
                            <li className='nav-side-right__li'>
                                <Link  to="/login">
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
                    Encuentra a tus compañeros de juego ideales
                    </p>
                    <Link to="/signup"><button className="button-func">Sign Up</button></Link>
                </section>
                <section className='home-main__left'>
                    <div className='home-main__circle'>
                        <img className='home-img' src={principalImg} alt=''/>
                    </div>

            
                </section>
            </main>
        </React.Fragment>
    );
};


export default Home;
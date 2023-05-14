import React from "react";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import img1 from "../assets/img-1.svg"
import img2 from "../assets/img-2.svg"
import img3 from "../assets/img-3.svg"
import img4 from "../assets/img-4.svg"

// TODO - Poner las img en un tamaño menos pesado

function Content() {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    const isMobile = useMediaQuery({ query: '(min-width: 360px) and (max-width: 767px)' });

    function SectionDesktopLaptop(props) {
        return (
            <div className={`flex bg-bg-original text-white p-40`} style={{ height: "484px" }}>
                <div className="flex flex-col items-center justify-center w-1/2 text-center">
                    <h3 className="font-extrabold font-roboto text-2xl">{props.h3}</h3>
                    <p className="font-light text-md mt-3">
                        {props.description}
                    </p>
                </div>
                <div className="flex items-center justify-center w-1/2">
                    <img src={props.img} className="w-5/6" alt="/" />
                </div>
            </div>
        )
    }
    function SectionDesktopLaptop2(props) {
        return (
            <div className='flex bg-info-home text-white p-40' style={{ height: "484px" }}>
                <div className="flex items-center justify-center w-1/2">
                    <img src={props.img} className="w-5/6" alt="/" />
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 text-center">
                    <h3 className="font-extrabold font-roboto text-2xl">{props.h3}</h3>
                    <p className="font-light text-md mt-3">
                        {props.description}
                    </p>
                </div>
            </div>
        )
    }
    function SectionDesktopLaptop3(props) {
        return (
            <div className="flex flex-col text-white bg-info-home p-40 items-center justify-center" style={{ height: "484px" }}>
                <img src={img4} className="w-1/6" alt="/" />
                <h3 className="font-extrabold font-roboto text-2xl mt-5 mb-10"> ¿Estás listo para comenzar con la aventura?</h3>
                <Link to="/signup">
                    <button className="w-48 bg-blue-600 transition duration-500 ease-in-out 
                        p-4 text-center rounded-full shadow-xl hover:bg-blue-900">
                        Regístrate
                    </button>
                </Link>
            </div>
        )
    }
    function SectionTablet(props) {
        return (
            <div className='flex bg-bg-original text-white p-20' style={{ height: "484px" }}>
                <div className="flex items-center justify-center w-1/2">
                    <img src={props.img} className="w-5/6" alt="/" />
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 text-center">
                    <h3 className="font-extrabold font-roboto text-2xl">{props.h3}</h3>
                    <p className="font-light text-md mt-3">
                        {props.description}
                    </p>
                </div>
            </div>
        )
    }
    function SectionTablet2(props) {
        return (
            <div className='flex bg-info-home text-white p-20' style={{ height: "484px" }}>
                <div className="flex flex-col items-center justify-center w-1/2 text-center">
                    <h3 className="font-extrabold font-roboto text-2xl">{props.h3}</h3>
                    <p className="font-light text-md mt-3">
                        {props.description}
                    </p>
                </div>
                <div className="flex items-center justify-center w-1/2">
                    <img src={props.img} className="w-5/6" alt="/" />
                </div>
            </div>
        )
    }
    function SectionTablet3() {
        return (
            <div className="flex flex-col text-white bg-info-home p-20 items-center justify-center" style={{ height: "484px" }}>
                <img src={img4} className="w-2/6" alt="/" />
                <h3 className="font-extrabold font-roboto text-2xl mt-5 mb-10"> ¿Estás listo para comenzar con la aventura?</h3>
                <Link to="/signup">
                    <button className="w-48 bg-blue-600 transition duration-500 ease-in-out 
                        p-4 text-center rounded-full shadow-xl hover:bg-blue-900">
                        Registrate
                    </button>
                </Link>
            </div>
        )
    }
    function SectionMobile(props) {
        return (
            <div className={`flex flex-col bg-${props.bg} text-white items-center mb-40 py-5`} style={{ height: "484px" }} >
                <div className="flex items-center justify-center">
                    <img src={props.img} className="w-72" alt="/" />
                </div>
                <div className="flex flex-col items-center justify-center w-full px-10  text-center">
                    <h3 className="font-extrabold font-roboto text-2xl">{props.h3}</h3>
                    <p className="font-light text-md mt-3">
                        {props.description}
                    </p>
                </div>
            </div>
        )
    }
    function SectionMobile2() {
        return (
            <div className="flex flex-col text-white bg-info-home items-center justify-center text-center" style={{ height: "484px" }}>
                <img src={img4} className="w-36" alt="/" />
                <h3 className="font-extrabold font-roboto px-4 text-xl mt-5 mb-10"> ¿Estás listo para comenzar con la aventura?</h3>
                <Link to="/signup">
                    <button className="w-48 bg-blue-600 transition duration-500 ease-in-out 
                        p-4 text-center rounded-full shadow-xl hover:bg-blue-900">
                        Registrate
                    </button>
                </Link>
            </div>
        )
    }
    return (
        <div>
            {(isDesktopOrLaptop) && (
                <>
                    <SectionDesktopLaptop
                        h3='Selecciona tus juegos favoritos'
                        description={'FireFly es una plataforma para los apasionados de los videojuegos que buscan un compañero de equipo ideal. Ofrecemos una amplia selección de juegos, desde los clásicos hasta los más modernos, para que puedas seleccionar tus favoritos y buscar a alguien con quien compartir la experiencia de juego. Contamos con una comunidad activa de jugadores que están buscando lo mismo que tú: compañeros de equipo con los que disfrutar de sus juegos favoritos.'}
                        img={img1}
                    />
                    <SectionDesktopLaptop2
                        h3='Encuentra tus compañeros de juego ideales'
                        description={'Firefly cuenta con una función llamada Match que funciona de la siguiente manera: seleccionas algunos juegos predeterminados sobre tus preferencias y estilo de juego, luego el algoritmo Match analiza tus respuestas y las compara con las de otros usuarios para encontrar a aquellos que tienen intereses similares. Finalmente, en la función Match encontrarás los perfiles de los usuarios que coinciden contigo para que puedas empezar a hablar con ellos y formar un equipo.'}
                        img={img2}
                    />
                    <SectionDesktopLaptop
                        h3='Interactúa con tus amigos y todas las personas que puedas conocer'
                        description={'FireFly ofrece chat en tiempo real para comunicarte con otros usuarios y la posibilidad de crear grupos privados para hablar y jugar juntos. Además, sin importar el tipo de videojuego que te guste, en FireFly siempre encontrarás compañeros de juego.'}
                        img={img3}
                    />
                    <SectionDesktopLaptop3 />
                </>
            )}
            {(isTablet) && (
                <>
                    <SectionTablet
                        h3='Selecciona tus juegos favoritos'
                        description={'FireFly es una plataforma para los apasionados de los videojuegos que buscan un compañero de equipo ideal. Ofrecemos una amplia selección de juegos, desde los clásicos hasta los más modernos, para que puedas seleccionar tus favoritos y buscar a alguien con quien compartir la experiencia de juego. Contamos con una comunidad activa de jugadores que están buscando lo mismo que tú: compañeros de equipo con los que disfrutar de sus juegos favoritos.'}
                        img={img1}
                    />
                    <SectionTablet2
                        h3='Encuentra tus compañeros de juego ideales'
                        description={'Firefly cuenta con una función llamada Match que funciona de la siguiente manera: seleccionas algunos juegos predeterminados sobre tus preferencias y estilo de juego, luego el algoritmo Match analiza tus respuestas y las compara con las de otros usuarios para encontrar a aquellos que tienen intereses similares. Finalmente, en la función Match encontrarás los perfiles de los usuarios que coinciden contigo para que puedas empezar a hablar con ellos y formar un equipo.'}
                        img={img2}
                    />
                    <SectionTablet
                        h3='Interactúa con tus amigos y todas las personas que puedas conocer'
                        description={'FireFly ofrece chat en tiempo real para comunicarte con otros usuarios y la posibilidad de crear grupos privados para hablar y jugar juntos. Además, sin importar el tipo de videojuego que te guste, en FireFly siempre encontrarás compañeros de juego.'}
                        img={img3}
                    />
                    <SectionTablet3 />
                </>
            )}
            {isMobile && (
                <>
                    <SectionMobile
                        h3='Selecciona tus juegos favoritos'
                        description={'FireFly es una plataforma para los apasionados de los videojuegos que buscan un compañero de equipo ideal. Ofrecemos una amplia selección de juegos, desde los clásicos hasta los más modernos, para que puedas seleccionar tus favoritos y buscar a alguien con quien compartir la experiencia de juego. Contamos con una comunidad activa de jugadores que están buscando lo mismo que tú: compañeros de equipo con los que disfrutar de sus juegos favoritos.'}
                        img={img1}
                    />
                    <SectionMobile
                        bg='info-home'
                        h3='Encuentra tus compañeros de juego ideales'
                        description={'Firefly cuenta con una función llamada Match que funciona de la siguiente manera: seleccionas algunos juegos predeterminados sobre tus preferencias y estilo de juego, luego el algoritmo Match analiza tus respuestas y las compara con las de otros usuarios para encontrar a aquellos que tienen intereses similares. Finalmente, en la función Match encontrarás los perfiles de los usuarios que coinciden contigo para que puedas empezar a hablar con ellos y formar un equipo.'}
                        img={img2}
                    />
                    <SectionMobile
                        h3='Interactúa con tus amigos y todas las personas que puedas conocer'
                        description={'FireFly ofrece chat en tiempo real para comunicarte con otros usuarios y la posibilidad de crear grupos privados para hablar y jugar juntos. Además, sin importar el tipo de videojuego que te guste, en FireFly siempre encontrarás compañeros de juego.'}
                        img={img3}
                    />
                    <SectionMobile2 />
                </>
            )}
        </div>
    )
}

export { Content }
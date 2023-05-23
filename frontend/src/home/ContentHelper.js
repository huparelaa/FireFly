import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css'; // Importa el archivo CSS personalizado
import img1 from "../assets/home.png"
import img2 from "../assets/home1.png"
import img3 from "../assets/home2.png"
import img4 from "../assets/home3.png"
import img5 from "../assets/login.png"
import img6 from "../assets/restaurar.png"
import img7 from "../assets/signup.png"
import img8 from "../assets/login2.png"
import img9 from "../assets/games.png"
import img10 from "../assets/dashboard.png"
import img11 from "../assets/dashboard2.png"
import img12 from "../assets/match.png"
import img13 from "../assets/match2.png"
import img14 from "../assets/match3.png"
import img15 from "../assets/match4.png"
import img16 from "../assets/chat.png"
import img17 from "../assets/chat2.png"
import img18 from "../assets/chat3.png"
import img19 from "../assets/dashboard3.png"
import img20 from "../assets/amigos.png"
import img21 from "../assets/perfil.png"
import img22 from "../assets/perfil2.png"


// TODO - Poner las img en un tamaño menos pesado

function ContentHelper() {
    const images = [img1, img2, img3]; // Asegúrate de tener las imágenes importadas o sus rutas correctas
    const images1 = [img4, img5, img6, img7, img8];
    const images2 = [img9, img10];
    const images3 = [img10, img11, img12, img13, img14, img15, img16, img17, img18];
    const images4 = [img19, img20, img21, img22];
    const descriptions = [
        'Interfaz de la página.',
        'Descripción general de nuestra página y la función "match" para encontrar tu compañero.',
        'Descripción de la función del chat y creación de grupos privados.',
    ];
    const descriptions1 = [
        'Vista general de la página de inicio que ofrece las opciones de registrarse o iniciar sesión. Si deseas acceder a las funciones, hay unos botones que especifican cada función y te redirigen a la sección correspondiente.',
        'Para iniciar sesión, tienes la opción de recuperar tu contraseña o registrarte. Cuenta con un botón que te redirige a la función deseada.',
        'Vista de recuperación de contraseña en la que recibirás un correo electrónico para reactivar tu cuenta. Al oprimir el botón, serás redirigido/a a la vista correspondiente de la función.',
        'En la vista de registro, encontrarás un formulario con campos para nombre, apellido, correo electrónico, contraseña y confirmación de contraseña. Además, se proporciona un enlace para acceder a la vista de inicio de sesión en caso de que ya tengas una cuenta registrada.',
        'Alerta de inicio de sesión exitoso.',
    ];
    const descriptions2 = [
        'Una vez iniciada la sesión, seleccionas los juegos que te gustan.',
        'Se te redirige a la vista general del panel de control.',
    ];
    const descriptions3 = [
        'Vista general del panel de control.',
        'Donde tienes la opción de "match" y "chats".',
        'Al presionar la opción "match", aparece un botón para encontrar a tu compañero con gustos similares.',
        'Aparece una cuenta regresiva.',
        'Y aparecen 3 perfiles con mayor % de similitud.',
        'Al presionar el nombre, se muestra el perfil de la persona en el que puedes agregarlo como amigo o enviarle un mensaje.',
        'Vista previa del chat de la persona seleccionada.',
        'Historial de chats en el que cuentas con una función adicional, como la creación de grupos.',
        'Para crear grupos privados, es necesario tener amigos a los que seleccionas y creas el grupo.',
    ];
    const descriptions4 = [
        'Vista general del panel de control que cuenta con un buscador para encontrar personas registradas en nuestra aplicación.',
        'También cuenta con la opción de lista de amigos, donde puedes ver el perfil de tus amigos y eliminarlos. Además, en la esquina superior aparece tu nombre, y al hacer clic en él, se muestra tu perfil de usuario.',
        'Al presionar tu nombre de usuario, se muestra la vista de perfil de usuario, que cuenta con la opción de editar perfil.',
        'En esta vista, encontrarás varias opciones para completar tu información personal, como tu nombre, edad, descripción, intereses o logros.',
    ];
    return (
        <div className="carousel-container">

            <Carousel >
                {images.map((image, index) => (

                    <div key={index}>
                        {console.log(image)}
                        <img src={image} alt={`Imagen ${index}`} />
                        <p className="description custom-color description-container" style={{ width: '100%', height: '65px', fontSize: '27px' }}>{descriptions[index]}</p>
                    </div>
                ))}
            </Carousel>



            <Carousel>
                {images1.map((image, index) => (
                    <div key={index}>
                        {console.log(image)}
                        <img src={image} alt={`Imagen ${index}`} />
                        <p className="description custom-color description-container" style={{ width: '100%', height: '90px', fontSize: '22px' }}>
                            {descriptions1[index]}
                        </p>
                        {index === 0 && (
                            <div>
                                <a href="https://onlinefirefly.social/login" target="_blank" rel="noopener noreferrer">
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '26%',
                                            left: '90.9%',
                                            transform: 'translate(-50%, -50%)',
                                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                            backgroundColor: 'darkviolet',
                                            color: 'white',
                                            padding: '10px 20px',
                                            fontSize: '16px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Ir al inicio
                                        de sesión
                                    </button>
                                </a>
                                <a href="https://onlinefirefly.social/signup" target="_blank" rel="noopener noreferrer">
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '80%',
                                            left: '58%',
                                            transform: 'translate(-50%, -50%)',
                                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                            backgroundColor: 'darkviolet',
                                            color: 'white',
                                            padding: '10px 20px',
                                            fontSize: '16px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Ir al registro
                                    </button>
                                </a>
                            </div>
                        )}

                        {index === 1 && (
                            <a href="https://onlinefirefly.social/login" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '70%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir al inicio de sesión
                                </button>
                            </a>
                        )}
                        {index === 2 && (
                            <a href="https://onlinefirefly.social/reset-password" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '75%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir a restaurar contraseña
                                </button>
                            </a>
                        )}
                        {index === 3 && (
                            <a href="https://onlinefirefly.social/signup" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '45%',
                                        left: '75%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir al registro
                                </button>
                            </a>
                        )}
                    </div>
                ))}
            </Carousel>

            <Carousel>
                {images2.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Imagen ${index}`} />
                        <p className="description custom-color description-container" style={{ width: '100%', height: '60px', fontSize: '22px'  }}>{descriptions2[index]}</p>
                        {index === 1 && (
                            <a href="https://onlinefirefly.social/dashboard" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '80%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir a la página de control
                                </button>
                            </a>
                        )}
                    </div>
                ))}
            </Carousel>


            <Carousel>
                {images3.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Imagen ${index}`} />
                        <p className="description custom-color description-container" style={{ width: '100%', height: '77px', fontSize: '22px' }}>{descriptions3[index]}</p>
                        {index === 2 && (
                            <a href="https://onlinefirefly.social/match" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '57%',
                                        left: '52.5%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir al match
                                </button>
                            </a>
                        )}
                        {index === 7 && (
                            <a href="https://onlinefirefly.social/chat" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '57%',
                                        left: '52.5%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir a tu chats
                                </button>
                            </a>
                        )}
                    </div>
                ))}
            </Carousel>

            <Carousel>
                {images4.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Imagen ${index}`} />
                        <p className="description custom-color description-container" style={{ width: '100%', height: '87px', fontSize: '22px' }}>{descriptions4[index]}</p>
                        {index === 2 && (
                            <a href="https://onlinefirefly.social/profile" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '20%',
                                        left: '65%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir a tu perfil
                                </button>
                            </a>
                        )}
                        {index === 3 && (
                            <a href="https://onlinefirefly.social/profile/edit" target="_blank" rel="noopener noreferrer">
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '85%',
                                        left: '82%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                                        backgroundColor: 'darkviolet',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Ir a editar perfil
                                </button>
                            </a>
                        )}

                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export { ContentHelper }
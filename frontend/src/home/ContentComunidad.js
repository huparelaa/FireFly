import React from "react";
import { Carousel } from 'react-responsive-carousel';
import Banner from "../assets/bannerdc.gif";
import img from "../assets/dc.png"

import './Carousel.css'; 
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ContentComunidad() {
    const images = [img, Banner];
    const descriptions = [
        "Contamos con un servidor de Discord para toda nuestra comunidad, en el cual tenemos canales de voz y canales de texto donde puedes compartir tus opiniones y gustos con todos los miembros.",
        "Únete a nuestra comunidad de Discord y explora más sobre FireFly. Haz clic en la imagen y serás redirigido al enlace de invitación.",
    ];

    const handleImageClick = (index) => {
        if (index === 1) {
            window.open("https://discord.gg/SPdaPuhdKH", "_blank");
        }
    };

    return (
        <div className="carousel-container">
            <Carousel>
                {images.map((image, index) => (
                    <div key={index} onClick={() => handleImageClick(index)}>
                        <a href={index === 1 ? "" : null} target="_blank">
                            <img src={image} alt={`Imagen ${index}`} />
                            <p className="description custom-color description-container" style={{ width: '100%', height: '130px', fontSize: '22px' }}>
                                {descriptions[index]}
                            </p>
                        </a>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export {ContentComunidad};

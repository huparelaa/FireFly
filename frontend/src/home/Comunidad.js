import './diseño.scss';
import { Footer } from './Footer.js';
import { HeaderComunidad } from './HeaderComunidad';
import { ContentComunidad } from './ContentComunidad';


const Comunidad = () => {
    return (
        <div>   
            <div className='block'> 
                <HeaderComunidad />

            </div>
            <div>
                <ContentComunidad/>
            </div>
            <Footer />
        </div>
    );
};

export default Comunidad;
import './diseño.scss';
import { Footer } from './Footer.js';
import { HeaderHelp } from './HeaderHelp';
import { HeroBanner } from './HeroBanner';
import { ContentHelper } from './ContentHelper';
const Helper = () => {
    return (
        <div>   
            <div className='block'> 
                <HeaderHelp />

            </div>
            <div>
                <ContentHelper/>
            </div>
            <Footer />
        </div>
    );
};

export default Helper;